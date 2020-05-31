'use strict';

// Initiate firebase auth.
function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
}


// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
    return JSON.parse(localStorage.getItem("currentUser")).image == null ? '../../assets/img/core-img/profile_placeholder.png' : JSON.parse(localStorage.getItem("currentUser")).image;
}


// Returns the signed-in user's display name.
function getUserName() {
    return JSON.parse(localStorage.getItem("currentUser")).full_name == null ? JSON.parse(localStorage.getItem("currentUser")).email : JSON.parse(localStorage.getItem("currentUser")).full_name;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

// Signs-out
function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        localStorage.setItem("currentUser", null);
        window.location.replace('../login/login.html');
    }).catch(function(error) {
        // An error happened.
    });
}


// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (user) { // User is signed in!
        // Get the signed-in user's profile pic and name.
        var profilePicUrl = getProfilePicUrl();
        var userName = getUserName();

        // Set the user's profile pic and name.
        //userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
        //userNameElement.textContent = userName;

        // Show user's profile and sign-out button.
        //userNameElement.removeAttribute('hidden');
        //userPicElement.removeAttribute('hidden');
        //signOutButtonElement.removeAttribute('hidden');

        // Hide sign-in button.
        //signInButtonElement.setAttribute('hidden', 'true');

        // We save the Firebase Messaging Device token and enable notifications.
        //saveMessagingDeviceToken();
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        //userNameElement.setAttribute('hidden', 'true');
        //userPicElement.setAttribute('hidden', 'true');
        //signOutButtonElement.setAttribute('hidden', 'true');

        // Show sign-in button.
        //signInButtonElement.removeAttribute('hidden');
    }
}

// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
    // Return true if the user is signed in Firebase
    if (isUserSignedIn()) {
        return true;
    }

    // Display a message to the user using a Toast.
    var data = {
        message: 'You must sign-in first',
        timeout: 2000
    };
    signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
    return false;
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



$('.sidenav-profile .user-name').text(getUserName());
$('.sidenav-profile .user-profile').find('img').attr('src', getProfilePicUrl());