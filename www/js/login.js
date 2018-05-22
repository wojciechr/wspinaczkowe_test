function login(){
		var userEmail = document.getElementById("email_field").value;
		var userPass = document.getElementById("password_field").value;
		
		firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {

		var errorCode = error.code;
		var errorMessage = error.message;
		



});

}


		

firebase.auth().onAuthStateChanged(function(user) {

                //console.log(user);

                if (user) {
					
                var displayName = user.displayName;
                var email = user.email;
                var providerData = user.providerData;
					
					document.getElementById("login_div").style.display = "none";
					document.getElementById("user_div").style.display = "block";

                
						var user = firebase.auth().currentUser;

						if(user != null ){
							
							var email_id=user.email;
							
							document.getElementById("user_para").innerHTML = "Witaj : " + user.email
						
						}							
                // User is signed in.
               
				
				document.getElementById('sign_in_status').textContent = 'Poprawnie zalogowałeś się';
				


                } else {
						document.getElementById("user_div").style.display = "none";
						document.getElementById("login_div").style.display = "block";
						            
			//document.getElementById('login_google').addEventListener('click',login_google_function, false);
			//document.getElementById('login_facebook').addEventListener('click',login_facebook_function, false);

                }

            });
function register (){
		var userEmail = document.getElementById("email_field").value;
		var userPass = document.getElementById("password_field").value;
			
			firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
			console.log(error);
});
	
}

function logout(){
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  document.getElementById('sign_in_status').textContent = 'Zostałeś poprawnie wylogowany';
	}).catch(function(error) {
	  // An error happened.
	});
}			
			
var LoggedUser = "Niezalogowany";
var LoggedUserName = "Niezalogowany";


// "duża" funkcja w której używamy poszczególnych id przypisanych do przycisków do wywołania danej funkcji..
function loginFirebase() {
	 $('#register').click(function() {  
			
			// validacja email i passoword, ponieważ muszą być one "valid" by przekazać je do funkcji poniższej.
			var email = $('#userEmail');    
			var pass = $('#userPass');   
			var userName = $('#userName');  			

						if(email.val() && pass.val()){
			// założenie konta w firebase przy wykożystaniu loginu i hasła
				firebase.auth().createUserWithEmailAndPassword(email.val(), pass.val()).then(function(user){
					console.log('everything went fine');
					console.log('user object:' + user);
					
					//you can save the user data here.
				}).catch(function(error) {
					console.log('there was an error');
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorCode + ' - ' + errorMessage);
				});

			} else {
				console.log('fill in both fields');
			}  
		});
		
		 $('#login').click(function() {

			var email = $('#userEmail');    
			var pass = $('#userPass');      

						if(email.val() && pass.val()){
			// logowanie na już założone konto w firebase.
				firebase.auth().signInWithEmailAndPassword(email.val(), pass.val()).then(function(user){
					console.log('everything went fine');
					console.log('user object:' + user);
					//you can save the user data here.
				}).catch(function(error) {
					console.log('there was an error');
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorCode + ' - ' + errorMessage);
				});

			} else {
				console.log('fill in both fields');
			}  
		});
		
		
		/* logowanie google: używamy pluginu: 
		cordova-plugin-googleplus zgodnie z informacjami zawartymi w config.xml
		dzięki temu pluginowi pobieramy idToken którego następnie używamy do zalogowania poprzez funckję 
		signInWithCredential - UWAGA TA FUNKCJA STWORZY KONTO I ZALOGUJE UŻYTKOWNIKA ALE NIE PRZYPISUJE HASŁA DO KONTA, LOGOWANIE ODBYWA SIĘ BEZ HASŁA PRZEZ TEN TOKEN.
		BARDZO WAŻNE JEST POPRAWNE SKONFUGIROWANIE PLUGINU W PLIKU config.xml.
		*/
		
		$('#logingoogle').click(function() {
			 window.plugins.googleplus.login(
        {
                 'webClientId' : '81802368109-8pomelv41akmrkb2vrmu6fhuch8bet5s.apps.googleusercontent.com',
                 'offline': true
        },
        function (obj) {

		console.log(obj);
             console.log("Hello, " + obj.displayName + ", " + obj.email);
            if (!firebase.auth().currentUser) {
               console.log('signing firebase');
					console.log(obj.idToken);
                firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken))
                .then((success) => {
                    console.log("success: " + JSON.stringify(success)); // to long json to put it in #feedback
                })
                .catch((error) => {
                        console.log("error0: " + JSON.stringify(error));
                      });
            }else{
                console.log('error1: already sigend in firebase');
            }
        },
        function (msg) {
          console.log("error2: " + msg);
        }
    );	
	
	});
	
	
		/* logowanie facebook: używamy pluginu: 
		cordova-plugin-facebook4 zgodnie z informacjami zawartymi w config.xml
		dzięki temu pluginowi pobieramy idToken którego następnie używamy do zalogowania poprzez funckję 
		signInWithCredential - UWAGA TA FUNKCJA STWORZY KONTO I ZALOGUJE UŻYTKOWNIKA ALE NIE PRZYPISUJE HASŁA DO KONTA, LOGOWANIE ODBYWA SIĘ BEZ HASŁA PRZEZ TEN TOKEN.
		BARDZO WAŻNE JEST POPRAWNE SKONFUGIROWANIE PLUGINU W PLIKU config.xml, oraz poprawne wpisanie klucza "klucz tajny aplikacji", lub "app secret key" w polu w konsoli firebase (zakładka METODA LOGOWANIA)
		*/
		
	$('#loginfacebook').click(function() {
	
		facebookConnectPlugin.getLoginStatus(
            function (status) {
                console.log("current status: " + JSON.stringify(status));
            },
            function (error) {
                console.log("Something went wrong: " + JSON.stringify(error));
            }
	 );
	 
	facebookConnectPlugin.login(["email"],function(result){
			console.log("logowanie:");
			 console.log("RESULT:" + JSON.stringify(result));
			  console.log("RESULT2:" + JSON.stringify(result.authResponse));
			  console.log("RESULT3:" + JSON.stringify(result.authResponse.accessToken));
			  
				firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken))
					.then((success) => {
						console.log("success: " + JSON.stringify(success)); 
				   })
				  
		//calling api after login success
		 facebookConnectPlugin.api("/me?fields=email,name,picture",["public_profile","email"]
		 ,function(userData){
			 //API success callback
			 console.log(JSON.stringify(userData));
		  },function(error){
			 //API error callback
			 console.log(JSON.stringify(error));
		  });
	   },function(error){
		  //authenication error callback
		 console.log(JSON.stringify(error));
		 });
	
	});
	

		$('#logout').click(function() {

			firebase.auth().signOut().then(function() {
				
			  LoggedUser = "Niezalogowany";
			  $( "#loggedas" ).html(LoggedUser);
			  $( "#loggedashome" ).html(LoggedUser);
			}, function(error) {
			  // An error happened.
			});
		
		facebookConnectPlugin.logout(function(){
                        console.log("FB LOGOUT SUCCESS");
						$( "#loggedas" ).html('Niezalogowany');
						$( "#loggedashome" ).html('Niezalogowanyer');
                    },function(){
                        console.log("FB LOGOUT FAIL");
                    }); 
		});	
}  

function loginFirebaseStatus() {
	firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
			// User is signed in.
			var displayName = user.displayName;
			LoggedUser = user.email;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			console.log(displayName);
				console.log(email);
				console.log(user.emailVerified);
				$( "#loggedas" ).html(email);
				$( "#loggedashome" ).html(LoggedUser);
				
		  } else {
			$( "#loggedas" ).html(LoggedUser);
		  }
			});
			

			$( "#loggedashome" ).html(LoggedUser);
				

			//	 facebookConnectPlugin.getLoginStatus(function (status) {
			//    console.log("current status: " + JSON.stringify(status));
			//   });

}  
  
 
window.onerror = function(what, line, file) {
	alert(what + '; ' + line + '; ' + file);
};
  


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}	

$(window).on('hashchange', function() {
  isUserLogged();
  loadAnswers();
});


async function isUserLogged() {
	loginFirebaseStatus();
	await sleep(2000);
	if (LoggedUser == 'Niezalogowany') {
		window.location.href = "#logowanie";
	}
}

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}



function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
}	

function onDeviceReady() {
	loginFirebase();
	loginFirebaseStatus();
}			