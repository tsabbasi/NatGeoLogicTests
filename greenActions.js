<script src="https://cdn.firebase.com/js/client/2.4.1/firebase.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<script type='text/javascript'>
var myFirebaseRef = new Firebase("https://earth-day-natgeo.firebaseio.com");

var kilometersKey = "kilometers";
var lightsKey = "lights";
var meatlessmealsKey = "meatlessmeals";
var showerKey = "shower";
var oldKilometers = 0;
var oldLightsEntered = 0;
var oldShowersEntered = 0;
var oldMeatlessmealsEntered = 0;
var packetKilometers;
var packetLights;
var packetMeatLessMeals;
var packetShower;
var kilometersEntered = "";
var dataEntered = "";
var username = document.getElementById("username").innerHTML;
var firstName = document.getElementById("firstName").innerHTML;
var lastName = document.getElementById("lastName").innerHTML;
var userEmail = document.getElementById("userEmail").innerHTML;

// NatGeo Roll User Vars
var NatGeoUsername = "NatGeoEarthDayRunUser";
var NatGeoRaceName = "Earth Day Run";
var NatGeoEmail = "taha@mywebnapp.com";

// Used in calculating the delta before submitting the update to Firebase
var oldNatGeoTotalCarbonOffset
var oldNatGeoKilometerOffset;
var oldNatGeoLightOffset;
var oldNatGeoShowerOffset;
var oldNatGeoMeatlessMealsOffset;
var natGeoTotalOffset;

// NatGeo packet information recieved and stored here;
var packetNatGeoKilometer;
var packetNatGeoLights;
var packetNatGeoShower;
var packetNatGeoMeatlessMeals;


var NatGeoData = myFirebaseRef.child(NatGeoUsername + "/userdata").on("value", function(snapshot) {


	if (snapshot.val() == null ) {
  // HEREEEEEE
  // add if statement qualifiedTarget, individual user target and race target 1.0002 and 5000
  // else instead if oldcarbonoffset => the race targetvalue THEN REMOVE PROGRESS BAR
 		myFirebaseRef.child(NatGeoUsername + '/userdata').set({ email : NatGeoEmail, name : NatGeoRaceName, totalcarbonoffset : "0" });
 	} else {
 		oldNatGeoTotalCarbonOffset = snapshot.val().totalcarbonoffset;
 		natGeoTotalOffset = document.getElementById("natGeoTotalCarbonOffset");
 		natGeoTotalOffset.innerHTML = "Earth Day Run Total Offset<br />Currently At: " + oldNatGeoTotalCarbonOffset + " kg and growing.";
 		// document.getElementById('natGeoTotalOffsetProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + oldNatGeoTotalCarbonOffset + ' big green"><span>' + oldNatGeoTotalCarbonOffset + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';

 		document.getElementById('natGeoTotalOffsetProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="' + oldNatGeoTotalCarbonOffset + '" aria-valuemin="0" aria-valuemax="100" style="width:' + oldNatGeoTotalCarbonOffset + '%"> ' + oldNatGeoTotalCarbonOffset + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';
 	}



});

var natGeoGreenActions = myFirebaseRef.child(NatGeoUsername + "/greenactions").on("value", function(snapshot) {
 	console.log(snapshot.val());

 	if (snapshot.val() == null ) {
 		packetNatGeoKilometer = 0;
 		packetNatGeoLights = 0;
 		packetNatGeoShower = 0;
 		packetNatGeoMeatlessMeals = 0;
 	} else {

		packetNatGeoKilometer = snapshot.val().kilometers;
		if( packetNatGeoKilometer == null ) {

		packetNatGeoKilometer = 0;
		}


		packetNatGeoLights = snapshot.val().lights;

		if( packetNatGeoLights == null) {

		packetNatGeoLights = 0;
		}

		packetNatGeoMeatlessMeals = snapshot.val().meatlessmeals;

		if( packetNatGeoMeatlessMeals == null ) {

		packetNatGeoMeatlessMeals = 0;
		}

		packetNatGeoShower = snapshot.val().shower;

		if( packetNatGeoShower == null ) {

		packetNatGeoShower = 0;
		}

 	}

	oldNatGeoKilometerOffset = document.getElementById("currentNatGeoKilometersTotal");
	oldNatGeoKilometerOffset.innerHTML = packetNatGeoKilometer;
	// document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoKilometer + ' big"><span>' + packetNatGeoKilometer + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
	document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetNatGeoKilometer + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetNatGeoKilometer + '%"> ' + packetNatGeoKilometer + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	oldNatGeoLightOffset = document.getElementById("currentNatGeoLightsEntered");
	oldNatGeoLightOffset.innerHTML = packetNatGeoLights;
	// document.getElementById('electricitySavedProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoLights + ' big"><span>' + packetNatGeoLights + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
	document.getElementById('electricitySavedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetNatGeoLights + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetNatGeoLights + '%"> ' + packetNatGeoLights + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	oldNatGeoShowerOffset = document.getElementById("currentNatGeoShowersEntered");
	oldNatGeoShowerOffset.innerHTML = packetNatGeoShower;
	// document.getElementById('waterSavedProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoShower + ' big"><span>' + packetNatGeoShower + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
	document.getElementById('waterSavedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetNatGeoShower + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetNatGeoShower + '%"> ' + packetNatGeoShower + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	oldNatGeoMeatlessMealsOffset = document.getElementById("currentNatGeoMeatlessmealsEntered");
	oldNatGeoMeatlessMealsOffset.innerHTML = packetNatGeoMeatlessMeals;
	// document.getElementById('meatlessMealsProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoMeatlessMeals + ' big"><span>' + packetNatGeoMeatlessMeals + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
	document.getElementById('meatlessMealsProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetNatGeoMeatlessMeals + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetNatGeoMeatlessMeals + '%"> ' + packetNatGeoMeatlessMeals + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';



});


var userData = myFirebaseRef.child(username + "/userdata").on("value", function(snapshot) {


	if (snapshot.val() == null ) {
 		myFirebaseRef.child(username + '/userdata').set({ email : userEmail, firstName : firstName, lastName : lastName, totalcarbonoffset : "0" });
 	} else {
 		var name = snapshot.val().firstName;
 		var oldTotalCarbonOffset = snapshot.val().totalcarbonoffset;
 		var greeting = document.getElementById("greeting");
		greeting.innerHTML = "Hello " + name + "! <br />Your Total Offset so far is " + oldTotalCarbonOffset + " kg offset";
		document.getElementById('totalOffsetProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="' + oldTotalCarbonOffset + '" aria-valuemin="0" aria-valuemax="100" style="width:' + oldTotalCarbonOffset + '%"> ' + oldTotalCarbonOffset + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';
 	}



});


 var greenactions = myFirebaseRef.child(username + "/greenactions").on("value", function(snapshot) {
 	console.log(snapshot.val());

 	if (snapshot.val() == null ) {
 		packetKilometers = 0;
 		packetLights = 0;
 		packetMeatLessMeals = 0;
 		packetShower = 0;
 	} else {

		packetKilometers = snapshot.val().kilometers;
		if( packetKilometers == null ) {

		packetKilometers = 0;
		}
    // packetLights = snapshot.val().lights * 0.377666667;
		packetLights = snapshot.val().lights;

		if( packetLights == null) {

		packetLights = 0;
		}
		// packetMeatLessMeals = snapshot.val().meatlessmeals * 0.00287;
		packetMeatLessMeals = snapshot.val().meatlessmeals;

		if( packetMeatLessMeals == null ) {

		packetMeatLessMeals = 0;
		}
		packetShower = snapshot.val().shower;

		if( packetShower == null ) {

		packetShower = 0;
		}

 	}

	oldKilometers = document.getElementById("currentKilometersTotal");
	oldKilometers.innerHTML = packetKilometers;
	document.getElementById('kilometersWalkedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetKilometers + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetKilometers + '%"> ' + packetKilometers + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';


	oldLightsEntered = document.getElementById("currentLightsEntered");
	oldLightsEntered.innerHTML = packetLights;
	document.getElementById('electricitySavedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetLights + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetLights + '%"> ' + packetLights + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	oldShowersEntered = document.getElementById("currentShowersEntered");
	oldShowersEntered.innerHTML = packetShower;
	document.getElementById('waterSavedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetShower + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetShower + '%"> ' + packetShower + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	oldMeatlessmealsEntered = document.getElementById("currentMeatlessmealsEntered");
	oldMeatlessmealsEntered.innerHTML = packetMeatLessMeals;
	document.getElementById('meatlessMealsProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetMeatLessMeals + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetMeatLessMeals + '%"> ' + packetMeatLessMeals + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';



});

 document.getElementById('sendKilometers').onclick = function(){

	updateFireBaseData("kilometersEntered");
 };

 document.getElementById('sendLights').onclick = function(){

 	updateFireBaseData("lightsEntered");

 };

 document.getElementById('sendShowers').onclick = function(){

 	updateFireBaseData("showersEntered");

 };

 document.getElementById('sendMeatlessmeals').onclick = function(){

 	updateFireBaseData("meatlessmealsEntered");

 };


 function updateFireBaseData (actionType) {

 	switch(actionType) {
	    case "kilometersEntered":
			dataEntered = document.getElementById(actionType).value;

			var newDataNumberVal = parseInt(dataEntered);
			// convertedValue = newDataNumberVal * 0.15;
			var oldDataNumberVal;

			if( oldKilometers.innerHTML !== "" ) {

				oldDataNumberVal = parseInt(oldKilometers.innerHTML);
			} else { 
				// oldDataNumberVal = 0;
				oldDataNumberVal = 0.0;
			}

			// new data number and old data number should be floats
			var totalDataNumber = oldDataNumberVal + newDataNumberVal;
			var myFirebaseRef = new Firebase("https://earth-day-natgeo.firebaseio.com");
			myFirebaseRef.child(username + '/greenactions').set({ kilometers : totalDataNumber, lights : packetLights, shower : packetShower, meatlessmeals : packetMeatLessMeals });


			var totalCarbonOffset = totalDataNumber + packetLights + packetShower + packetMeatLessMeals;
			myFirebaseRef.child(username + '/userdata').set({ email : userEmail, firstName : firstName, lastName : lastName, totalcarbonoffset : totalCarbonOffset });

			var oldNatGeoDataNumberVal;

			if( oldNatGeoKilometerOffset.innerHTML !== "" ) {

				oldNatGeoDataNumberVal = parseInt(oldNatGeoKilometerOffset.innerHTML);
			} else {
				oldNatGeoDataNumberVal = 0;
			}

			var totalNatGeoDataNumber = oldNatGeoDataNumberVal + newDataNumberVal;

			myFirebaseRef.child(NatGeoUsername + '/greenactions').set({ kilometers : totalNatGeoDataNumber, lights : packetNatGeoLights, shower : packetNatGeoShower, meatlessmeals : packetNatGeoMeatlessMeals });

			var oldNatGeoTotalCarbonOffsetDataNumberVal;

			if( natGeoTotalOffset.innerHTML !== "0" ) {

				oldNatGeoTotalCarbonOffsetDataNumberVal = parseInt(natGeoTotalOffset.innerHTML);
			} else {
				oldNatGeoTotalCarbonOffsetDataNumberVal = 0;
			}

			var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + newDataNumberVal;
			myFirebaseRef.child(NatGeoUsername + '/userdata').set({ email : NatGeoEmail, name : NatGeoRaceName, totalcarbonoffset : natGeoNewTotalOffset });

	        break;

	    case "lightsEntered":
			dataEntered = document.getElementById(actionType).value;

			var newDataNumberVal = parseInt(dataEntered);
			var oldDataNumberVal;

			if( oldLightsEntered.innerHTML !== "" ) {

				oldDataNumberVal = parseInt(oldLightsEntered.innerHTML);
			} else {
				oldDataNumberVal = 0;
			}

			var totalDataNumber = oldDataNumberVal + newDataNumberVal;
			var myFirebaseRef = new Firebase("https://earth-day-natgeo.firebaseio.com");
			myFirebaseRef.child(username + '/greenactions').set({ kilometers : packetKilometers, lights : totalDataNumber, shower : packetShower, meatlessmeals : packetMeatLessMeals });

			var totalCarbonOffset = packetKilometers + totalDataNumber + packetShower + packetMeatLessMeals;
			myFirebaseRef.child(username + '/userdata').set({ email : userEmail, firstName : firstName, lastName : lastName, totalcarbonoffset : totalCarbonOffset });

			var oldNatGeoDataNumberVal;

			if( oldNatGeoLightOffset.innerHTML !== "" ) {

				oldNatGeoDataNumberVal = parseInt(oldNatGeoLightOffset.innerHTML);
			} else {
				oldNatGeoDataNumberVal = 0;
			}

			var totalNatGeoDataNumber = oldNatGeoDataNumberVal + newDataNumberVal;

			myFirebaseRef.child(NatGeoUsername + '/greenactions').set({ kilometers : packetNatGeoKilometer, lights : totalNatGeoDataNumber, shower : packetNatGeoShower, meatlessmeals : packetNatGeoMeatlessMeals });

			var oldNatGeoTotalCarbonOffsetDataNumberVal;

			if( natGeoTotalOffset.innerHTML !== "0" ) {

				oldNatGeoTotalCarbonOffsetDataNumberVal = parseInt(natGeoTotalOffset.innerHTML);
			} else {
				oldNatGeoTotalCarbonOffsetDataNumberVal = 0;
			}

			var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + newDataNumberVal;
			myFirebaseRef.child(NatGeoUsername + '/userdata').set({ email : NatGeoEmail, name : NatGeoRaceName, totalcarbonoffset : natGeoNewTotalOffset });

	        break;

        case "showersEntered":
			dataEntered = document.getElementById(actionType).value;

			var newDataNumberVal = parseInt(dataEntered);
			var oldDataNumberVal;

			if( oldShowersEntered.innerHTML !== "" ) {

				oldDataNumberVal = parseInt(oldShowersEntered.innerHTML);
			} else {
				oldDataNumberVal = 0;
			}

			var totalDataNumber = oldDataNumberVal + newDataNumberVal;
			var myFirebaseRef = new Firebase("https://earth-day-natgeo.firebaseio.com");
			myFirebaseRef.child(username + '/greenactions').set({ kilometers : packetKilometers, lights : packetLights, shower : totalDataNumber, meatlessmeals : packetMeatLessMeals });

			var totalCarbonOffset = packetKilometers + packetLights + totalDataNumber + packetMeatLessMeals;
			myFirebaseRef.child(username + '/userdata').set({ email : userEmail, firstName : firstName, lastName : lastName, totalcarbonoffset : totalCarbonOffset });


			var oldNatGeoDataNumberVal;

			if( oldNatGeoShowerOffset.innerHTML !== "" ) {

				oldNatGeoDataNumberVal = parseInt(oldNatGeoShowerOffset.innerHTML);
			} else {
				oldNatGeoDataNumberVal = 0;
			}

			var totalNatGeoDataNumber = oldNatGeoDataNumberVal + newDataNumberVal;

			myFirebaseRef.child(NatGeoUsername + '/greenactions').set({ kilometers : packetNatGeoKilometer, lights : packetNatGeoLights, shower : totalNatGeoDataNumber, meatlessmeals : packetNatGeoMeatlessMeals });

			var oldNatGeoTotalCarbonOffsetDataNumberVal;

			if( natGeoTotalOffset.innerHTML !== "0" ) {

				oldNatGeoTotalCarbonOffsetDataNumberVal = parseInt(natGeoTotalOffset.innerHTML);
			} else {
				oldNatGeoTotalCarbonOffsetDataNumberVal = 0;
			}

			var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + newDataNumberVal;
			myFirebaseRef.child(NatGeoUsername + '/userdata').set({ email : NatGeoEmail, name : NatGeoRaceName, totalcarbonoffset : natGeoNewTotalOffset });



	        break;

        case "meatlessmealsEntered":
			dataEntered = document.getElementById(actionType).value;

			var newDataNumberVal = parseInt(dataEntered);
			var oldDataNumberVal;

			if( oldMeatlessmealsEntered.innerHTML !== "" ) {

				oldDataNumberVal = parseInt(oldMeatlessmealsEntered.innerHTML);
			} else {
				oldDataNumberVal = 0;
			}

			var totalDataNumber = oldDataNumberVal + newDataNumberVal;
			var myFirebaseRef = new Firebase("https://earth-day-natgeo.firebaseio.com");
			myFirebaseRef.child(username + '/greenactions').set({ kilometers : packetKilometers, lights : packetLights, shower : packetShower, meatlessmeals : totalDataNumber });

			var totalCarbonOffset = packetKilometers + packetLights + packetShower + totalDataNumber;
			myFirebaseRef.child(username + '/userdata').set({ email : userEmail, firstName : firstName, lastName : lastName, totalcarbonoffset : totalCarbonOffset });


			var oldNatGeoDataNumberVal;

			if( oldNatGeoMeatlessMealsOffset.innerHTML !== "" ) {

				oldNatGeoDataNumberVal = parseInt(oldNatGeoMeatlessMealsOffset.innerHTML);
			} else {
				oldNatGeoDataNumberVal = 0;
			}

			var totalNatGeoDataNumber = oldNatGeoDataNumberVal + newDataNumberVal;

			myFirebaseRef.child(NatGeoUsername + '/greenactions').set({ kilometers : packetNatGeoKilometer, lights : packetNatGeoLights, shower : packetNatGeoShower, meatlessmeals : totalNatGeoDataNumber });

			var oldNatGeoTotalCarbonOffsetDataNumberVal;

			if( natGeoTotalOffset.innerHTML !== "0" ) {

				oldNatGeoTotalCarbonOffsetDataNumberVal = parseInt(natGeoTotalOffset.innerHTML);
			} else {
				oldNatGeoTotalCarbonOffsetDataNumberVal = 0;
			}

			var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + newDataNumberVal;
			myFirebaseRef.child(NatGeoUsername + '/userdata').set({ email : NatGeoEmail, name : NatGeoRaceName, totalcarbonoffset : natGeoNewTotalOffset });

	        break;

	    default:
	        break;
	}

 }
</script>
