

var FB_ROOT = "https://brilliant-torch-5122.firebaseio.com";
var USERS_LOCATION = FB_ROOT + "/users";
var CURRENT_USER;

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
        }
        else
        {
            console.log(authData);
            addUser(authData);
        }
        document.getElementById("prof_pic").src = authData.google.cachedUserProfile.picture;
        document.getElementById("prof_name").innerHTML = authData.google.displayName;
        CURRENT_USER = authData;
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

function addQuestion() {
    var selectedCategory;
    var radios = document.getElementsByName('category');
    var answers = document.getElementsByClassName("answer floatLabelInput");
    for (var i = 0; i < radios.length; i++)
    {
        if (radios[i].checked)
            selectedCategory = radios[i].value;
    }
    var quesRef = new Firebase(FB_ROOT + "/questions/" + selectedCategory);
    var quesID = quesRef.push({
        author: CURRENT_USER.google.email.split("@")[0],
        question: document.getElementById("questionText").value,
        answer1: answers[0].value,
        answer2: answers[1].value,
        answer3: answers[2].value,
        answer4: answers[3].value 
    });
    alert("Added question: " + quesID);
    toggleModal();
}