    $('#loginfacebook').click(function () {

        facebookConnectPlugin.getLoginStatus(
            function (status) {
                console.log("current status: " + JSON.stringify(status));
            },
            function (error) {
                console.log("Something went wrong: " + JSON.stringify(error));
            }
        );

        facebookConnectPlugin.login(["email"], function (result) {
            console.log("logowanie:");
            console.log("RESULT:" + JSON.stringify(result));
            console.log("RESULT2:" + JSON.stringify(result.authResponse));
            console.log("RESULT3:" + JSON.stringify(result.authResponse.accessToken));

            firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken))
                .then((success) => {
                    console.log("success: " + JSON.stringify(success));
                    window.location.href = "main.html#user_account";
                })

            //calling api after login success
            facebookConnectPlugin.api("/me?fields=email,name,picture", ["public_profile", "email"]
                , function (userData) {
                    //API success callback
                    console.log(JSON.stringify(userData));

                }, function (error) {
                    //API error callback
                    console.log(JSON.stringify(error));
                });
        }, function (error) {
            //authenication error callback
            console.log(JSON.stringify(error));
        });
    });

facebookConnectPlugin.getLoginStatus(function (status) {
    console.log("current status: " + JSON.stringify(status));
});