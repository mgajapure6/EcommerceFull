'use strict';

$('.user-info-card .user-profile').find('img').attr('src', getProfilePicUrl());

$('.current-user-name').text(JSON.parse(localStorage.getItem("currentUser")).username == null ? 'Not Found' : JSON.parse(localStorage.getItem("currentUser")).username);

$('.current-user-full-name').text(JSON.parse(localStorage.getItem("currentUser")).full_name == null ? 'Not Found' : JSON.parse(localStorage.getItem("currentUser")).full_name);

$('.current-user-mobile').text(JSON.parse(localStorage.getItem("currentUser")).mobile == null ? 'Not Found' : JSON.parse(localStorage.getItem("currentUser")).mobile);

$('.current-user-email').text(JSON.parse(localStorage.getItem("currentUser")).email == null ? 'Not Found' : JSON.parse(localStorage.getItem("currentUser")).email);

$('.current-user-address').text(JSON.parse(localStorage.getItem("currentUser")).address == null ? 'Not Found' : JSON.parse(localStorage.getItem("currentUser")).address);


function setSeller() {
    var seller = JSON.parse(localStorage.getItem('currentUser'));
    $('#username').val(seller.username);
    $('#full-name').val(seller.full_name);
    $('#mobile').val(seller.mobile);
    $('#email').val(seller.email);
    $('#address').val(seller.address);
    $('.user-info-card .user-profile').find('img').attr('src', getProfilePicUrl());

}


function updateSeller(ele) {
    var full_name = $('#full-name').val();
    var username = $('#username').val();
    var mobile = $('#mobile').val();
    var email = $('#email').val();
    var address = $('#address').val();
    var image = $('#profile-img').attr('src');
    var imageUrl = null;

    if (full_name == '' || mobile == '' || email == '') {
        $('.alert-msg').empty().append('<div class="alert alert-danger" role="alert"><p><strong>Make sure following feilds are correctly fill.</strong></p><p>Full Name Required</p> <p>Mobile Number Required</p> <p>Email Required</p><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
    }

    var currentUser = firebase.auth().currentUser;
    var seller = JSON.parse(localStorage.getItem('currentUser'));
    $(ele).prop('disabled', true);

    if (image != null && image.indexOf('data:image') != -1) {
        // Create a root reference
        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child('seller_profile/' + seller.uid + '.' + $('#profile-img').attr('file-type'));
        imageRef.putString(image, 'data_url').then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(url) {
                console.log('File available at', url);
                imageUrl = url;
                updateUserAndSeller(imageUrl);
            });
        });
    } else {
        imageUrl = imageUrl == null ? seller.image : null;
        updateUserAndSeller(imageUrl);
    }

}

function updateUserAndSeller(imageUrl) {
    var full_name = $('#full-name').val();
    var username = $('#username').val();
    var mobile = $('#mobile').val();
    var email = $('#email').val();
    var address = $('#address').val();

    var currentUser = firebase.auth().currentUser;
    var seller = JSON.parse(localStorage.getItem('currentUser'));

    currentUser.updateProfile({
        displayName: full_name,
        email: email
    }).then(function() {
        // User updated successful.
        // updating seller
        var db = firebase.firestore();
        var sellerRef = db.collection("seller").doc(seller.uid);
        sellerRef.update({
            email: email,
            address: address,
            username: username,
            image: imageUrl,
            full_name: full_name,
            mobile: mobile
        }).then(function() {
            var newCurrentUser = {};
            newCurrentUser.email = email;
            newCurrentUser.address = address;
            newCurrentUser.username = username;
            newCurrentUser.image = imageUrl;
            newCurrentUser.full_name = full_name;
            newCurrentUser.mobile = mobile;
            newCurrentUser.uid = seller.uid;
            newCurrentUser.userid = seller.userid;
            newCurrentUser.password = null;
            localStorage.setItem('currentUser', JSON.stringify(newCurrentUser));
            console.log("Document successfully updated!");
            $('.alert-msg').empty().append('<div class="alert alert-success" role="alert"><strong>Updated Successfully.</strong></div>');
            setTimeout(function() {
                window.location.replace("edit-profile.html");
            }, 1000);
        }).catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            $('.alert-msg').empty().append('<div class="alert alert-danger" role="alert">Unable to update account.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $(ele).prop('disabled', false);
        });
    }).catch(function(error) {
        // An error happened.
        $('.alert-msg').empty().append('<div class="alert alert-danger" role="alert">Unable to update account.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        $(ele).prop('disabled', false);
    });
}