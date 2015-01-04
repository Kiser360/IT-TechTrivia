

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
        document.getElementById("activeUserPic").src = authData.google.cachedUserProfile.picture;
        document.getElementById("activeUsername").innerHTML = authData.google.displayName;
        CURRENT_USER = authData;
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
    //document.getElementById("QuestionDialog").toggle();
    var answers = document.getElementsByClassName("answer");
    var selectedCategory = document.getElementById("categories").getAttribute("selected");
    var quesRef = new Firebase(FB_ROOT + "/questions/" + selectedCategory);
    var quesID = quesRef.push({
        author: CURRENT_USER.google.email.split("@")[0],
        question: document.getElementById("questionText").committedValue,
        answer1: answers[0].committedValue,
        answer2: answers[1].committedValue,
        answer3: answers[2].committedValue,
        answer4: answers[3].committedValue 
    });
    alert("Added question: " + quesID);
}