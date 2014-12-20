function googleAuth() {
    var FB = new Firebase("https://brilliant-torch-5122.firebaseio.com/");
    FB.authWithOAuthPopup("google", function(error, authData) {
        if (error) 
        {
            alert("Login Failed!\n" + error);
        }
        else
        {
            alert("Authenticated: \n\n" + authData);
            toggleAuth();
            
        }
    
    },{
        remember: "sessionOnly",
        scope: "profile"
    });
    
}