'use strict'


function createSellerAccount() {
    var email = $('#reg-email').val();
    var password = $('#reg-password').val();
    var confirm_pass = $('#reg-confirm-password').val();

    if (email == '' || password == '' || confirm_pass == '') {
        $('.alert-msg').empty().append('<div class="alert alert-danger" role="alert">Please Enter Email And Password <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        return;
    }
    if (password != confirm_pass) {
        $('.alert-msg').empty().append('<div class="alert alert-danger" role="alert">Password not matched <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        return;
    }
    $('.register-btn').prop('disabled', true);
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
        console.log('createUserWithEmailAndPassword result::', result);

        var db = firebase.firestore();
        var currentUser = {
            uid: null,
            email: email,
            password: password,
            userid: result.user.uid,
            address: null,
            username: null,
            image: null,
            full_name: null,
            mobile: null
        }
        db.collection("seller").add(currentUser).then(function(docRef) {
            console.log("Document successfully written!", docRef);
            currentUser.uid = docRef.id;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            $('.alert-msg').empty().append('<div class="alert alert-success" role="alert"><strong>Registration Successfull. Please Wait.</strong></div>');
            window.location.replace("../product/shop-grid.html");
        }).catch(function(error) {
            console.error("Error writing document: ", error);
            $('.alert-msg').empty().append('<div class="alert alert-danger" role="alert">Unable to create your account.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $('.register-btn').prop('disabled', false);
        });

    }).catch(function(error) {
        $('.alert-msg').empty().append('<div class="alert alert-danger" role="alert">Unable to create your account.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        $('.register-btn').prop('disabled', false);
    });
}

// Signs-out
function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        localStorage.setItem("currentUser", null);
    }).catch(function(error) {
        // An error happened.
    });
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}

// Checks that Firebase has been imported.
checkSetup();
// signout currentUser first
signOut();