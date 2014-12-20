

var USERS_LOCATION = "https://brilliant-torch-5122.firebaseio.com/users";

function googleAuth() {
    var FB = new Firebase(USERS_LOCATION);
    FB.authWithOAuthPopup("google", function(error, authData) {
        if (error) 
        {
            alert("Login Failed!\n" + error);
        }
        else
        {
            toggleAuth();
            checkIfUserExists(authData);
        }
    
    },{
        remember: "sessionOnly",
        scope: "email"
    });
    
}

function checkIfUserExists(authData) {
    var usersRef = new Firebase(USERS_LOCATION);
    usersRef.child(authData.google.email.split("@")[0]).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        if (exists)
        {
            console.log(authData);
            alert("welcome back: ");
        }
        else
        {
            console.log(authData);
            alert("New User: ");
            addUser(authData);
        }
        document.getElementById("prof_pic").src = authData.google.cachedUserProfile.picture;
        document.getElementById("prof_name").innerHTML = authData.google.displayName;
        toggleFAB();
    });
}

function addUser(authData) {
    usersRef = new Firebase(USERS_LOCATION + authData.google.email.split("@")[0]);
    usersRef.set({
        displayName: authData.google.displayName,
        fullName: authData.google.cachedUserProfile.given_name +" "+ authData.google.cachedUserProfile.family_name,
        picture: authData.google.cachedUserProfile.picture,
        email: authData.google.email
    });
}