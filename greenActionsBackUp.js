<script src="https://cdn.firebase.com/js/client/2.4.1/firebase.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<script type='text/javascript'>
// Checking if User is logged in

var loggedIn = document.getElementById("loggedIn");

if (loggedIn == null) {
	console.log("User Not Loggedin. Scripts not running...");
} else {
	console.log("User Loggedin. Scripts running...");


var myFirebaseRef = new Firebase("https://earth-day-natgeo-dev.firebaseio.com");

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
var NatGeoEmail = "support@natgeorun.sg";

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


// Race OFFSET Targets
var individualTargetOffset = 100.02;
var natGeoTargetOffset = 20000.0;


// Progress Bars
var natGeoOffsetProgBarNumber;
var natGeoTransportOffSetProgressBarNumber;
var natGeoElectricOffSetProgressBarNumber;
var natGeoWaterOffSetProgressBarNumber;
var natGeoMeatOffSetProgressBarNumber;

var individualOffsetProgBarNumber;
var individualTransportOffSetProgressBarNumber;
var individualElectricOffSetProgressBarNumber;
var individualWaterOffSetProgressBarNumber;
var individualMeatOffSetProgressBarNumber;


// Qualified User Objects


var NatGeoData = myFirebaseRef.child(NatGeoUsername + "/userdata").on("value", function(snapshot) {


	if (snapshot.val() == null ) {
 		myFirebaseRef.child(NatGeoUsername + '/userdata').set({ email : NatGeoEmail, name : NatGeoRaceName, totalcarbonoffset : "0" });

 	} else {
 		oldNatGeoTotalCarbonOffset = snapshot.val().totalcarbonoffset;
 		natGeoTotalOffset = document.getElementById("natGeoTotalCarbonOffset");

 		if (oldNatGeoTotalCarbonOffset <= natGeoTargetOffset) {

 			natGeoTotalOffset.innerHTML = "Earth Day Run Total Offset<br />Currently At: <br />" + oldNatGeoTotalCarbonOffset + " kg and growing.";


	 		natGeoOffsetProgBarNumber = oldNatGeoTotalCarbonOffset / natGeoTargetOffset;
	 		natGeoOffsetProgBarNumber = Math.round(natGeoOffsetProgBarNumber * 100);
	 		if (natGeoOffsetProgBarNumber == 100) {
	 			natGeoOffsetProgBarNumber = 99;
	 		}


	 		document.getElementById('natGeoTotalOffsetProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="' + natGeoOffsetProgBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoOffsetProgBarNumber + '%"> ' + natGeoOffsetProgBarNumber + '% Total Offset</div></div>';
 		} else {

 			natGeoTotalOffset.innerHTML = "Earth Day Run Total Offset Target ACHIEVED!<br />Currently At: <br />" + oldNatGeoTotalCarbonOffset + " kg and growing.";

 			natGeoOffsetProgBarNumber = 100;

	 		document.getElementById('natGeoTotalOffsetProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="' + natGeoOffsetProgBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoOffsetProgBarNumber + '%"> ' + natGeoOffsetProgBarNumber + '% Total Offset! We Reached Our Goal!</div></div>';
 		}



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

	if (packetNatGeoKilometer == 0) {
		natGeoTransportOffSetProgressBarNumber = 0;
		// document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoKilometer + ' big"><span>' + packetNatGeoKilometer + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
	document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoTransportOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoTransportOffSetProgressBarNumber + '%"> ' + natGeoTransportOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	} else {
		if (packetNatGeoKilometer < natGeoTargetOffset) {
			natGeoTransportOffSetProgressBarNumber = packetNatGeoKilometer / natGeoTargetOffset;
			natGeoTransportOffSetProgressBarNumber = Math.round(natGeoTransportOffSetProgressBarNumber * 100);
			if (natGeoTransportOffSetProgressBarNumber == 100) {
				natGeoTransportOffSetProgressBarNumber = 99;
			}
			document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoTransportOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoTransportOffSetProgressBarNumber + '%"> ' + natGeoTransportOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';
		} else {
			natGeoTransportOffSetProgressBarNumber = 100;
			document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoTransportOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoTransportOffSetProgressBarNumber + '%"> ' + natGeoTransportOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';
		}

	}

	// document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoKilometer + ' big"><span>' + packetNatGeoKilometer + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
	// document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetNatGeoKilometer + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetNatGeoKilometer + '%"> ' + packetNatGeoKilometer + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';



	oldNatGeoLightOffset = document.getElementById("currentNatGeoLightsEntered");
	oldNatGeoLightOffset.innerHTML = packetNatGeoLights;

	if (packetNatGeoLights == 0) {
		natGeoElectricOffSetProgressBarNumber = 0;
		// document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoKilometer + ' big"><span>' + packetNatGeoKilometer + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
		document.getElementById('electricitySavedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoElectricOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoElectricOffSetProgressBarNumber + '%"> ' + natGeoElectricOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	} else {
		if (packetNatGeoLights < natGeoTargetOffset) {
			natGeoElectricOffSetProgressBarNumber = packetNatGeoLights / natGeoTargetOffset;
			natGeoElectricOffSetProgressBarNumber = Math.round(natGeoElectricOffSetProgressBarNumber * 100);
			if (natGeoElectricOffSetProgressBarNumber == 100) {
				natGeoElectricOffSetProgressBarNumber = 99;
			}
			document.getElementById('electricitySavedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoElectricOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoElectricOffSetProgressBarNumber + '%"> ' + natGeoElectricOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';
		} else {
			natGeoElectricOffSetProgressBarNumber = 100;
			document.getElementById('electricitySavedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoElectricOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoElectricOffSetProgressBarNumber + '%"> ' + natGeoElectricOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';
		}

	}



	// document.getElementById('electricitySavedProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoLights + ' big"><span>' + packetNatGeoLights + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
	// document.getElementById('electricitySavedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetNatGeoLights + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetNatGeoLights + '%"> ' + packetNatGeoLights + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	oldNatGeoShowerOffset = document.getElementById("currentNatGeoShowersEntered");
	oldNatGeoShowerOffset.innerHTML = packetNatGeoShower;

	if (packetNatGeoShower == 0) {
		natGeoWaterOffSetProgressBarNumber = 0;
		// document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoKilometer + ' big"><span>' + packetNatGeoKilometer + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
		document.getElementById('waterSavedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoWaterOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoWaterOffSetProgressBarNumber + '%"> ' + natGeoWaterOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	} else {
		if (packetNatGeoShower < natGeoTargetOffset) {
			natGeoWaterOffSetProgressBarNumber = packetNatGeoShower / natGeoTargetOffset;
			natGeoWaterOffSetProgressBarNumber = Math.round(natGeoWaterOffSetProgressBarNumber * 100);
			if (natGeoWaterOffSetProgressBarNumber == 100) {
				natGeoWaterOffSetProgressBarNumber = 99;
			}
			document.getElementById('waterSavedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoWaterOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoWaterOffSetProgressBarNumber + '%"> ' + natGeoWaterOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';
		} else {
			natGeoWaterOffSetProgressBarNumber = 100;
			document.getElementById('waterSavedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoWaterOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoWaterOffSetProgressBarNumber + '%"> ' + natGeoElectricOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';
		}


	}



	// document.getElementById('waterSavedProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoShower + ' big"><span>' + packetNatGeoShower + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
	// document.getElementById('waterSavedProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetNatGeoShower + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetNatGeoShower + '%"> ' + packetNatGeoShower + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	oldNatGeoMeatlessMealsOffset = document.getElementById("currentNatGeoMeatlessmealsEntered");
	oldNatGeoMeatlessMealsOffset.innerHTML = packetNatGeoMeatlessMeals;

	if (packetNatGeoMeatlessMeals == 0) {
		natGeoMeatOffSetProgressBarNumber = 0;
		// document.getElementById('kilometersWalkedProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoKilometer + ' big"><span>' + packetNatGeoKilometer + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
		document.getElementById('meatlessMealsProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoMeatOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoMeatOffSetProgressBarNumber + '%"> ' + natGeoMeatOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';

	} else {
		if (packetNatGeoMeatlessMeals < natGeoTargetOffset) {
			natGeoMeatOffSetProgressBarNumber = packetNatGeoMeatlessMeals / natGeoTargetOffset;
			natGeoMeatOffSetProgressBarNumber = Math.round(natGeoMeatOffSetProgressBarNumber * 100);
			if (natGeoMeatOffSetProgressBarNumber == 100) {
				natGeoMeatOffSetProgressBarNumber = 99;
			}
			document.getElementById('meatlessMealsProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoMeatOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoMeatOffSetProgressBarNumber + '%"> ' + natGeoMeatOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';
		} else {
			natGeoMeatOffSetProgressBarNumber = 100;
			document.getElementById('meatlessMealsProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + natGeoMeatOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + natGeoMeatOffSetProgressBarNumber + '%"> ' + natGeoMeatOffSetProgressBarNumber + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';
		}


	}


	// document.getElementById('meatlessMealsProgCircle').innerHTML = '<div class="clearfix"><div class="c100 p' + packetNatGeoMeatlessMeals + ' big"><span>' + packetNatGeoMeatlessMeals + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
	// document.getElementById('meatlessMealsProgCircle').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + packetNatGeoMeatlessMeals + '" aria-valuemin="0" aria-valuemax="100" style="width:' + packetNatGeoMeatlessMeals + '%"> ' + packetNatGeoMeatlessMeals + '% Kilometers Walked/Biked Goal Completed (success)</div></div>';



});



var userData = myFirebaseRef.child(username + "/userdata").on("value", function(snapshot) {


	if (snapshot.val() == null ) {
 		myFirebaseRef.child(username + '/userdata').set({ email : userEmail, firstName : firstName, lastName : lastName, totalcarbonoffset : "0" });
 		myFirebaseRef.child(username + '/qualifyingStatus').set({ qualified : 0 });
 	} else {
 		var name = snapshot.val().firstName;
 		var oldTotalCarbonOffset = snapshot.val().totalcarbonoffset;
 		var greeting = document.getElementById("greeting");

 		if (oldTotalCarbonOffset < individualTargetOffset) {

			greeting.innerHTML = "Hello " + name + "! <br />Your Total Offset so far is:<br />" + oldTotalCarbonOffset + " kg";

	 		individualOffsetProgBarNumber = oldTotalCarbonOffset / individualTargetOffset;
	 		individualOffsetProgBarNumber = Math.round(individualOffsetProgBarNumber * 100);
	 		if (individualOffsetProgBarNumber == 100) {
	 			individualOffsetProgBarNumber = 99;
	 		}

			document.getElementById('totalOffsetProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="' + individualOffsetProgBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualOffsetProgBarNumber + '%"> ' + individualOffsetProgBarNumber + '% Your Total Offset.</div></div>';
 		} else {

 			greeting.innerHTML = "Congratulations " + name + "! <br />You've Met Your Offset Goal!<br />And Qualified For The Race<br />You Have Offset: " + oldTotalCarbonOffset + " kg<br />Look For An Email From Us For Your Ticket, And Keep Adding To Your Carbon Offset!.";

 			individualOffsetProgBarNumber = 100;

	 		document.getElementById('totalOffsetProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="' + individualOffsetProgBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualOffsetProgBarNumber + '%"> ' + individualOffsetProgBarNumber + '% Total Offset! We Reached Our Goal!</div></div>';
	 		myFirebaseRef.child(username + '/qualifyingStatus').set({ qualified : 1 });
 		}
 	}

 	document.getElementById('natGeoTransportOffSetProgressBarNumber').innerHTML = natGeoTransportOffSetProgressBarNumber;
	document.getElementById('natGeoElectricOffSetProgressBarNumber').innerHTML = natGeoElectricOffSetProgressBarNumber;
	document.getElementById('natGeoWaterOffSetProgressBarNumber').innerHTML = natGeoWaterOffSetProgressBarNumber;
	document.getElementById('natGeoMeatOffSetProgressBarNumber').innerHTML = natGeoMeatOffSetProgressBarNumber;

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


		packetLights = snapshot.val().lights;

		if( packetLights == null) {

		packetLights = 0;
		}
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

	if (packetKilometers == 0) {
		individualTransportOffSetProgressBarNumber = 0;
		document.getElementById('kilometersWalkedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualTransportOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualTransportOffSetProgressBarNumber + '%"> ' + individualTransportOffSetProgressBarNumber + '% Offsets by Transport</div></div>';

	} else {

		if (packetKilometers < individualTargetOffset) {
			individualTransportOffSetProgressBarNumber = packetKilometers / individualTargetOffset;
			individualTransportOffSetProgressBarNumber = Math.round(individualTransportOffSetProgressBarNumber * 100);
			if (individualTransportOffSetProgressBarNumber == 100) {
				individualTransportOffSetProgressBarNumber = 99;
			}
			document.getElementById('kilometersWalkedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualTransportOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualTransportOffSetProgressBarNumber + '%"> ' + individualTransportOffSetProgressBarNumber + '% Offsets by Transport</div></div>';
		} else {

			individualTransportOffSetProgressBarNumber = 100;
			document.getElementById('kilometersWalkedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualTransportOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualTransportOffSetProgressBarNumber + '%"> ' + individualTransportOffSetProgressBarNumber + '% Offsets by Transport</div></div>';
		}
	}


	oldLightsEntered = document.getElementById("currentLightsEntered");
	oldLightsEntered.innerHTML = packetLights;

	if (packetLights == 0) {
		individualElectricOffSetProgressBarNumber = 0;
		document.getElementById('electricitySavedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualElectricOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualElectricOffSetProgressBarNumber + '%"> ' + individualElectricOffSetProgressBarNumber + '% Offset by Electric</div></div>';

	} else {

		if (packetLights < individualTargetOffset) {
			individualElectricOffSetProgressBarNumber = packetLights / individualTargetOffset;
			individualElectricOffSetProgressBarNumber = Math.round(individualElectricOffSetProgressBarNumber * 100);
			if (individualElectricOffSetProgressBarNumber == 100) {
				individualElectricOffSetProgressBarNumber = 99;
			}
			document.getElementById('electricitySavedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualElectricOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualElectricOffSetProgressBarNumber + '%"> ' + individualElectricOffSetProgressBarNumber + '% Offset by Electric</div></div>';
		} else {

			individualElectricOffSetProgressBarNumber = 100;
			document.getElementById('electricitySavedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualElectricOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualElectricOffSetProgressBarNumber + '%"> ' + individualElectricOffSetProgressBarNumber + '% Offset by Electric</div></div>';
		}
	}

	oldShowersEntered = document.getElementById("currentShowersEntered");
	oldShowersEntered.innerHTML = packetShower;

	if (packetShower == 0) {
		individualWaterOffSetProgressBarNumber = 0;
		document.getElementById('waterSavedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualWaterOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualWaterOffSetProgressBarNumber + '%"> ' + individualWaterOffSetProgressBarNumber + '% Offset by Taking Shorter Showers</div></div>';

	} else {




		if (packetShower < individualTargetOffset) {
			individualWaterOffSetProgressBarNumber = packetShower / individualTargetOffset;
			individualWaterOffSetProgressBarNumber = Math.round(individualWaterOffSetProgressBarNumber * 100);
			if (individualWaterOffSetProgressBarNumber == 100) {
				individualWaterOffSetProgressBarNumber = 99;
			}
			document.getElementById('waterSavedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualWaterOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualWaterOffSetProgressBarNumber + '%"> ' + individualWaterOffSetProgressBarNumber + '% Offset by Taking Shorter Showers</div></div>';
		} else {

			individualWaterOffSetProgressBarNumber = 100;
			document.getElementById('waterSavedProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualWaterOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualWaterOffSetProgressBarNumber + '%"> ' + individualWaterOffSetProgressBarNumber + '% Offset by Taking Shorter Showers</div></div>';
		}
	}

	oldMeatlessmealsEntered = document.getElementById("currentMeatlessmealsEntered");
	oldMeatlessmealsEntered.innerHTML = packetMeatLessMeals;

	if (packetMeatLessMeals == 0) {
		individualMeatOffSetProgressBarNumber = 0;
		document.getElementById('meatlessMealsProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualMeatOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualMeatOffSetProgressBarNumber + '%"> ' + individualMeatOffSetProgressBarNumber + '% Offset by Taking Shorter Showers</div></div>';

	} else {


		if (packetMeatLessMeals < individualTargetOffset) {
			individualMeatOffSetProgressBarNumber = packetMeatLessMeals / individualTargetOffset;
			individualMeatOffSetProgressBarNumber = Math.round(individualMeatOffSetProgressBarNumber * 100);
			if (individualMeatOffSetProgressBarNumber == 100) {
				individualMeatOffSetProgressBarNumber = 99;
			}
			document.getElementById('meatlessMealsProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualMeatOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualMeatOffSetProgressBarNumber + '%"> ' + individualMeatOffSetProgressBarNumber + '% Offset by Taking Shorter Showers</div></div>';
		} else {

			individualMeatOffSetProgressBarNumber = 100;
			document.getElementById('meatlessMealsProgBar').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + individualMeatOffSetProgressBarNumber + '" aria-valuemin="0" aria-valuemax="100" style="width:' + individualMeatOffSetProgressBarNumber + '%"> ' + individualMeatOffSetProgressBarNumber + '% Offset by Taking Shorter Showers</div></div>';
		}
	}

	document.getElementById('individualTransportOffSetProgressBarNumber').innerHTML = individualTransportOffSetProgressBarNumber;
	document.getElementById('individualElectricOffSetProgressBarNumber').innerHTML = individualElectricOffSetProgressBarNumber;
	document.getElementById('individualWaterOffSetProgressBarNumber').innerHTML = individualWaterOffSetProgressBarNumber;
	document.getElementById('individualMeatOffSetProgressBarNumber').innerHTML = individualMeatOffSetProgressBarNumber;

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
			// CONVERSION
			document.getElementById(actionType).value = null;
			// CONVERSION

			var newDataNumberVal = parseFloat(dataEntered);

			// CONVERSION
			// var convertedValue = (newDataNumberVal * 0.15);
			var convertedValue = (newDataNumberVal * 0.15);
			convertedValue = parseFloat(convertedValue.toPrecision(4));
			convertedValue = Math.round(convertedValue * 10000) / 10000;

			// CONVERSION
			var oldDataNumberVal;

			if( oldKilometers.innerHTML !== "" ) {

				// CONVERSION
				// oldDataNumberVal = parseInt(oldKilometers.innerHTML);
				oldDataNumberVal = parseFloat(oldKilometers.innerHTML);
				// CONVERSION
			} else {
				// oldDataNumberVal = 0;
				// CONVERSION
				oldDataNumberVal = 0.0;
				// CONVERSION
			}

			// CONVERSION
			// var totalDataNumber = oldDataNumberVal + newDataNumberVal;
			var totalDataNumber = oldDataNumberVal + convertedValue;
			// CONVERSION
			var myFirebaseRef = new Firebase("https://earth-day-natgeo-dev.firebaseio.com");
			myFirebaseRef.child(username + '/greenactions').set({ kilometers : totalDataNumber, lights : packetLights, shower : packetShower, meatlessmeals : packetMeatLessMeals });


			var totalCarbonOffset = totalDataNumber + packetLights + packetShower + packetMeatLessMeals;
			totalCarbonOffset = parseFloat(totalCarbonOffset.toPrecision(4));
			myFirebaseRef.child(username + '/userdata').set({ email : userEmail, firstName : firstName, lastName : lastName, totalcarbonoffset : totalCarbonOffset });

			var oldNatGeoDataNumberVal;

			if( oldNatGeoKilometerOffset.innerHTML !== "" ) {
				// CONVERSION
				// oldNatGeoDataNumberVal = parseInt(oldNatGeoKilometerOffset.innerHTML);
				oldNatGeoDataNumberVal = parseFloat(oldNatGeoKilometerOffset.innerHTML);
				// CONVERSION

			} else {
				// CONVERSION
				// oldNatGeoDataNumberVal = 0;
				oldNatGeoDataNumberVal = 0.0;
				// CONVERSION
			}

			// CONVERSION
			// var totalNatGeoDataNumber = oldNatGeoDataNumberVal + newDataNumberVal;
			var totalNatGeoDataNumber = oldNatGeoDataNumberVal + convertedValue;
			totalNatGeoDataNumber = parseFloat(totalNatGeoDataNumber.toPrecision(4));
			// CONVERSION

			myFirebaseRef.child(NatGeoUsername + '/greenactions').set({ kilometers : totalNatGeoDataNumber, lights : packetNatGeoLights, shower : packetNatGeoShower, meatlessmeals : packetNatGeoMeatlessMeals });

			var oldNatGeoTotalCarbonOffsetDataNumberVal;

			// CONVERSION
			// if( natGeoTotalOffset.innerHTML !== "0" ) {
			if( oldNatGeoTotalCarbonOffset !== "0" ) {

				oldNatGeoTotalCarbonOffsetDataNumberVal = oldNatGeoTotalCarbonOffset;
			} else {
				oldNatGeoTotalCarbonOffsetDataNumberVal = 0.0;
			}

			// CONVERSION

			// CONVERSION
			// var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + newDataNumberVal;
			var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + convertedValue;
			// CONVERSION
			myFirebaseRef.child(NatGeoUsername + '/userdata').set({ email : NatGeoEmail, name : NatGeoRaceName, totalcarbonoffset : natGeoNewTotalOffset });



	        break;

	    case "lightsEntered":
			dataEntered = document.getElementById(actionType).value;
			// CONVERSION
			document.getElementById(actionType).value = null;
			// CONVERSION

			var newDataNumberVal = parseFloat(dataEntered);

			// CONVERSION
			var convertedValue = (newDataNumberVal * 0.377666667);
			convertedValue = parseFloat(convertedValue.toPrecision(4));
			convertedValue = Math.round(convertedValue * 10000) / 10000;
			var oldDataNumberVal;

			if( oldLightsEntered.innerHTML !== "" ) {
				// CONVERSION
				// oldDataNumberVal = parseInt(oldLightsEntered.innerHTML);
				oldDataNumberVal = parseFloat(oldLightsEntered.innerHTML);
				// CONVERSION
			} else {
				// oldDataNumberVal = 0;
				// CONVERSION
				oldDataNumberVal = 0.0;
				// CONVERSION
			}

			// CONVERSION
			// var totalDataNumber = oldDataNumberVal + newDataNumberVal;
			var totalDataNumber = oldDataNumberVal + convertedValue;
			// CONVERSION
			var myFirebaseRef = new Firebase("https://earth-day-natgeo-dev.firebaseio.com");
			myFirebaseRef.child(username + '/greenactions').set({ kilometers : packetKilometers, lights : totalDataNumber, shower : packetShower, meatlessmeals : packetMeatLessMeals });

			var totalCarbonOffset = packetKilometers + totalDataNumber + packetShower + packetMeatLessMeals;
			totalCarbonOffset = parseFloat(totalCarbonOffset.toPrecision(4));
			myFirebaseRef.child(username + '/userdata').set({ email : userEmail, firstName : firstName, lastName : lastName, totalcarbonoffset : totalCarbonOffset });

			var oldNatGeoDataNumberVal;

			if( oldNatGeoLightOffset.innerHTML !== "" ) {
				// CONVERSION
				// oldNatGeoDataNumberVal = parseInt(oldNatGeoLightOffset.innerHTML);
				oldNatGeoDataNumberVal = parseFloat(oldNatGeoLightOffset.innerHTML);
				// CONVERSION

			} else {
				// CONVERSION
				// oldNatGeoDataNumberVal = 0;
				oldNatGeoDataNumberVal = 0.0;
				// CONVERSION
			}

			// CONVERSION
			// var totalNatGeoDataNumber = oldNatGeoDataNumberVal + newDataNumberVal;
			var totalNatGeoDataNumber = oldNatGeoDataNumberVal + convertedValue;
			totalNatGeoDataNumber = parseFloat(totalNatGeoDataNumber.toPrecision(4));
			// CONVERSION
			myFirebaseRef.child(NatGeoUsername + '/greenactions').set({ kilometers : packetNatGeoKilometer, lights : totalNatGeoDataNumber, shower : packetNatGeoShower, meatlessmeals : packetNatGeoMeatlessMeals });

			var oldNatGeoTotalCarbonOffsetDataNumberVal;

			// CONVERSION
			// if( natGeoTotalOffset.innerHTML !== "0" ) {
			if( oldNatGeoTotalCarbonOffset !== "0" ) {
					// CONVERSION
				// oldNatGeoTotalCarbonOffsetDataNumberVal = parseInt(natGeoTotalOffset.innerHTML);
				oldNatGeoTotalCarbonOffsetDataNumberVal = oldNatGeoTotalCarbonOffset;
					// CONVERSION
			} else {
					// CONVERSION
				// oldNatGeoTotalCarbonOffsetDataNumberVal = 0;
				oldNatGeoTotalCarbonOffsetDataNumberVal = 0.0;
					// CONVERSION
			}
			// CONVERSION
			// var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + newDataNumberVal;
			var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + convertedValue;
			myFirebaseRef.child(NatGeoUsername + '/userdata').set({ email : NatGeoEmail, name : NatGeoRaceName, totalcarbonoffset : natGeoNewTotalOffset });

	        break;

        case "showersEntered":
			dataEntered = document.getElementById(actionType).value;
			// CONVERSION
			document.getElementById(actionType).value = null;
			// CONVERSION

			var newDataNumberVal = parseFloat(dataEntered);

			// CONVERSION
			var convertedValue = (newDataNumberVal * 0.43);
			convertedValue = parseFloat(convertedValue.toPrecision(4));
			convertedValue = Math.round(convertedValue * 10000) / 10000;
			var oldDataNumberVal;

			if( oldShowersEntered.innerHTML !== "" ) {
				// CONVERSION
				// oldDataNumberVal = parseInt(oldShowersEntered.innerHTML);
				oldDataNumberVal = parseFloat(oldShowersEntered.innerHTML);
				// CONVERSION
			} else {
				// oldDataNumberVal = 0;
				// CONVERSION
				oldDataNumberVal = 0.0;
				// CONVERSION
			}

			// CONVERSION
			// var totalDataNumber = oldDataNumberVal + newDataNumberVal;
			var totalDataNumber = oldDataNumberVal + convertedValue;
			// CONVERSION
			var myFirebaseRef = new Firebase("https://earth-day-natgeo-dev.firebaseio.com");
			myFirebaseRef.child(username + '/greenactions').set({ kilometers : packetKilometers, lights : packetLights, shower : totalDataNumber, meatlessmeals : packetMeatLessMeals });

			var totalCarbonOffset = packetKilometers + packetLights + totalDataNumber + packetMeatLessMeals;
			totalCarbonOffset = parseFloat(totalCarbonOffset.toPrecision(4));
			myFirebaseRef.child(username + '/userdata').set({ email : userEmail, firstName : firstName, lastName : lastName, totalcarbonoffset : totalCarbonOffset });


			var oldNatGeoDataNumberVal;

			if( oldNatGeoShowerOffset.innerHTML !== "" ) {
				// CONVERSION
				// oldNatGeoDataNumberVal = parseInt(oldNatGeoShowerOffset.innerHTML);
				oldNatGeoDataNumberVal = parseFloat(oldNatGeoShowerOffset.innerHTML);
				// CONVERSION

			} else {
				// CONVERSION
				// oldNatGeoDataNumberVal = 0;
				oldNatGeoDataNumberVal = 0.0;
				// CONVERSION
			}

			// CONVERSION
			// var totalNatGeoDataNumber = oldNatGeoDataNumberVal + newDataNumberVal;
			var totalNatGeoDataNumber = oldNatGeoDataNumberVal + convertedValue;
			totalNatGeoDataNumber = parseFloat(totalNatGeoDataNumber.toPrecision(4));
			// CONVERSION
			myFirebaseRef.child(NatGeoUsername + '/greenactions').set({ kilometers : packetNatGeoKilometer, lights : packetNatGeoLights, shower : totalNatGeoDataNumber, meatlessmeals : packetNatGeoMeatlessMeals });

			var oldNatGeoTotalCarbonOffsetDataNumberVal;

			// CONVERSION
			// if( natGeoTotalOffset.innerHTML !== "0" ) {
			if( oldNatGeoTotalCarbonOffset !== "0" ) {
					// CONVERSION
				// oldNatGeoTotalCarbonOffsetDataNumberVal = parseInt(natGeoTotalOffset.innerHTML);
				oldNatGeoTotalCarbonOffsetDataNumberVal = oldNatGeoTotalCarbonOffset;
					// CONVERSION
			} else {
				// CONVERSION
				// oldNatGeoTotalCarbonOffsetDataNumberVal = 0;
				oldNatGeoTotalCarbonOffsetDataNumberVal = 0.0;
				// CONVERSION
			}

			// CONVERSION
			// var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + newDataNumberVal;
			var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + convertedValue;
			myFirebaseRef.child(NatGeoUsername + '/userdata').set({ email : NatGeoEmail, name : NatGeoRaceName, totalcarbonoffset : natGeoNewTotalOffset });

	        break;

        case "meatlessmealsEntered":
			dataEntered = document.getElementById(actionType).value;
			var error = document.getElementById("showMeatAlert");
			if (dataEntered < 0) {
				error.innerHTML = '<div class="alert alert-danger"><strong>Oops!</strong> The number you have entered is invalid. Please enter a positive number.</div>';
				document.getElementById(actionType).value = null;
			} else {
				error.innerHTML = '';
				document.getElementById(actionType).value = null;

				// CONVERSION
				document.getElementById(actionType).value = null;
				// CONVERSION

				var newDataNumberVal = parseFloat(dataEntered);
				// CONVERSION
				// var convertedValue = (newDataNumberVal * 0.00041);
				var convertedValue = (newDataNumberVal * 0.00287);
				convertedValue = parseFloat(convertedValue.toPrecision(4));
				convertedValue = Math.round(convertedValue * 10000) / 10000;
				// console.log(convertedValue);
				// convertedValue = (Math.round(convertedValue * 10000) / 10000);
				// console.log(convertedValue);
				// CONVERSION
				var oldDataNumberVal;

				if( oldMeatlessmealsEntered.innerHTML !== "" ) {
					// CONVERSION
					// oldDataNumberVal = parseInt(oldMeatlessmealsEntered.innerHTML);
					oldDataNumberVal = parseFloat(oldMeatlessmealsEntered.innerHTML);
					// CONVERSION
				} else {
					// oldDataNumberVal = 0;
					// CONVERSION
					oldDataNumberVal = 0.0;
					// CONVERSION
				}

				// CONVERSION
				// var totalDataNumber = oldDataNumberVal + newDataNumberVal;
				// var totalDataNumber = oldDataNumberVal + convertedValue;
				var totalDataNumber = oldDataNumberVal + convertedValue;

				// CONVERSION
				var myFirebaseRef = new Firebase("https://earth-day-natgeo-dev.firebaseio.com");
				myFirebaseRef.child(username + '/greenactions').set({ kilometers : packetKilometers, lights : packetLights, shower : packetShower, meatlessmeals : totalDataNumber });

				var totalCarbonOffset = packetKilometers + packetLights + packetShower + totalDataNumber;
				totalCarbonOffset = parseFloat(totalCarbonOffset.toPrecision(4));
				myFirebaseRef.child(username + '/userdata').set({ email : userEmail, firstName : firstName, lastName : lastName, totalcarbonoffset : totalCarbonOffset });


				var oldNatGeoDataNumberVal;

				if( oldNatGeoMeatlessMealsOffset.innerHTML !== "" ) {
					// CONVERSION
					// oldNatGeoDataNumberVal = parseInt(oldNatGeoMeatlessMealsOffset.innerHTML);
					oldNatGeoDataNumberVal = parseFloat(oldNatGeoMeatlessMealsOffset.innerHTML);
					// CONVERSION

				} else {
					// CONVERSION
					// oldNatGeoDataNumberVal = 0;
					oldNatGeoDataNumberVal = 0.0;
					// CONVERSION
				}

				// CONVERSION
				// var totalNatGeoDataNumber = oldNatGeoDataNumberVal + newDataNumberVal;
				// var totalNatGeoDataNumber = oldNatGeoDataNumberVal + convertedValue;
				var totalNatGeoDataNumber = oldNatGeoDataNumberVal + convertedValue;
				totalNatGeoDataNumber = parseFloat(totalNatGeoDataNumber.toPrecision(4));
				// CONVERSION
				myFirebaseRef.child(NatGeoUsername + '/greenactions').set({ kilometers : packetNatGeoKilometer, lights : packetNatGeoLights, shower : packetNatGeoShower, meatlessmeals : totalNatGeoDataNumber });

				var oldNatGeoTotalCarbonOffsetDataNumberVal;

				// CONVERSION
				// if( natGeoTotalOffset.innerHTML !== "0" ) {
				if( oldNatGeoTotalCarbonOffset !== "0" ) {
						// CONVERSION
					// oldNatGeoTotalCarbonOffsetDataNumberVal = parseInt(natGeoTotalOffset.innerHTML);
					oldNatGeoTotalCarbonOffsetDataNumberVal = oldNatGeoTotalCarbonOffset;
						// CONVERSION
				} else {
					// CONVERSION
					// oldNatGeoTotalCarbonOffsetDataNumberVal = 0;
					oldNatGeoTotalCarbonOffsetDataNumberVal = 0.0;
						// CONVERSION
				}
				// CONVERSION
				// var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + newDataNumberVal;
				// var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + convertedValue;
				var natGeoNewTotalOffset = oldNatGeoTotalCarbonOffsetDataNumberVal + convertedValue;
				myFirebaseRef.child(NatGeoUsername + '/userdata').set({ email : NatGeoEmail, name : NatGeoRaceName, totalcarbonoffset : natGeoNewTotalOffset });
			}

	        break;

	    default:
	        break;
	}

 }
}
</script>
