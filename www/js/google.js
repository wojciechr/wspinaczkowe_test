    $('#logingoogle').click(function () {
        window.plugins.googleplus.login(
            {
                'webClientId': '81802368109-8pomelv41akmrkb2vrmu6fhuch8bet5s.apps.googleusercontent.com',
                'offline': true
            },
            function (obj) {

                console.log(obj);
                if (!firebase.auth().currentUser) {
                    console.log(obj.idToken);
                    firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken))
                        .then((success) => {
                            console.log("success: " + JSON.stringify(success));
                            window.location.href = "main.html#user_account";
                        })
                        .catch((error) => {
                            document.querySelector("#feedback").innerHTML = "error0: " + JSON.stringify(error);
                        });
                } else {
                    document.querySelector("#feedback").innerHTML = 'error1: already sigend in firebase';
                }
            },
            function (msg) {
                document.querySelector("#feedback").innerHTML = "error2: " + msg;
            }
        );

});





