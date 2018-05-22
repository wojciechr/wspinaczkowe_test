const config = {
    apiKey: "AIzaSyA-ejZDxLBfqxuqcsakiY31p6iXt4cJc8M",
    authDomain: "drogi-wspinaczkowe.firebaseapp.com",
    databaseURL: "https://drogi-wspinaczkowe.firebaseio.com",
    projectId: "drogi-wspinaczkowe",
    storageBucket: "drogi-wspinaczkowe.appspot.com",
    messagingSenderId: "81802368109"
  };
  firebase.initializeApp(config);
  
function dodajDroge(){	
	var userId;
	var user = firebase.auth().currentUser;

	if (user) {
		userId = user.uid;
	} else {
		window.alert("Nie zalogowałeś się!");
		return;
	}

	var firebaseRef = firebase.database().ref();
	
	var userPath = "Users/" + userId;
	var db = firebase.database().ref().child(userPath);	
	var lastChild = db.orderByKey().limitToLast(1);
		
	lastChild.once("value", snap => {		
		var lastChildName;
		snap.forEach(function(child) {
			lastChildName = child.key;
		});
		
		var typ;
		var stylMoonboard = document.getElementById("moonboard_field").checked;	
		var stylSkaly = document.getElementById("skaly_field").checked;
		var stylScianka = document.getElementById("scianka_field").checked;
		
		if(stylMoonboard){
			typ = document.getElementById("moonboard_field").value;
		}else if(stylScianka){
			typ = document.getElementById("scianka_field").value;
		}else if(stylSkaly){
			typ = document.getElementById("skaly_field").value;
		}
		
		var stylPrzejscia;
		var typOS = document.getElementById("os_field").checked;
		var typFlash = document.getElementById("flash_field").checked;
		var typRP = document.getElementById("pr_field").checked;
		var typProba = document.getElementById("proba_field").checked;
		
		if(typOS){
			stylPrzejscia = document.getElementById("os_field").value;
		}else if(typFlash){
			stylPrzejscia = document.getElementById("flash_field").value;
		}else if(typRP){
			stylPrzejscia = document.getElementById("pr_field").value;
		}else if(typProba){
			stylPrzejscia = document.getElementById("proba_field").value;
		}
		
		var nazwaDrogi = document.getElementById("nazwa_field").value;
		var nazwaSkaly = document.getElementById("skala_field").value;
		var nazwaRegion = document.getElementById("region_field").value;
		var trudnosc = document.getElementById("trudnosc_field").value;
		var data = document.getElementById("datePicker").value;
				
		var dbNrTrasy;
		if(typeof lastChildName == 'undefined'){
			dbNrTrasy = 1;
		}else{
			dbNrTrasy = Number(lastChildName.match(/\d+/)[0])+1;
		}
		var dbNowaNazwaTrasy;
		
		if(dbNrTrasy < 10){			
			dbNowaNazwaTrasy = "Trasa0" + dbNrTrasy.toString();
		}else{			
			dbNowaNazwaTrasy = "Trasa" + dbNrTrasy.toString();
		}		
		
		if(typeof stylPrzejscia == 'undefined'){
			window.alert("Nie wybrałeś stylu przejścia!");
			return;
		}
		if(typeof typ == 'undefined'){
			window.alert("Nie wybrałeś typu drogi!");
			return;
		}
		if(nazwaDrogi == 'undefined'){
			window.alert("Nie wpisałeś nazwy drogi!");
			return;
		}
		if(nazwaSkaly.length == 0){
			window.alert("Nie wpisałeś nazwy skały!");
			return;
		}
		if(nazwaRegion.length == 0){
			window.alert("Nie wpisałeś nazwy regionu!");
			return;
		}
		if(data.length == 0){
			window.alert("Nie wybrałeś daty!");
			return;
		}
				
		var dbNazwaTrasy = db.child(dbNowaNazwaTrasy);
		db.child(dbNazwaTrasy.key).set({
			NazwaDrogi: nazwaDrogi,
			NazwaSkały: nazwaSkaly,
			NazwaRegionu: nazwaRegion,
			Typ: typ,
			Trudność: trudnosc,
			StylSrzejścia: stylPrzejscia,
			Data: data
		});		
		
		window.alert("Droga została dodana do bazy.");
	});
}   