'use strict';

// Signs-in
function signInWithGoogle() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
        console.log("signInWithGoogle getRedirectResult result:", result)
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function signInWithFacebook() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function signInWithEmailPassword() {
    var email = $('#login-email').val();
    var password = $('#login-password').val();
    if (email == '' || password == '') {
        $('.alert-msg').empty().append('<div class="alert alert-danger" role="alert">Please Enter Email And Password <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        return;
    }
    $('.login-btn').prop('disabled', true);
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
        console.log('signInWithEmailPassword result::', result);
        var db = firebase.firestore();
        // Create a reference to the cities collection
        var sellerRef = db.collection("seller");
        // Create a query against the collection.
        var query = sellerRef.where("userid", "==", result.user.uid).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log("doc ", doc);
                var currentUser = doc.data();
                currentUser.uid = doc.id;
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                $('.alert-msg').empty().append('<div class="alert alert-success" role="alert"><strong>Login success. Please wait</strong></div>');
                window.location.replace("../product/shop-grid.html");
            });
        }).catch(function(error) {
            $('.alert-msg').empty().append('<div class="alert alert-danger" role="alert">Invalid Email or Password <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $('.login-btn').prop('disabled', false);
        });
    }).catch(function(error) {
        $('.alert-msg').empty().append('<div class="alert alert-danger" role="alert">Invalid Email or Password <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        $('.login-btn').prop('disabled', false);
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


// Initiate firebase auth.
function initFirebaseAuth() {
    // Listen to auth state changes.
    //firebase.auth().onAuthStateChanged(authStateObserver);
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
// initialize Firebase
initFirebaseAuth();
// signout currentUser first
signOut();