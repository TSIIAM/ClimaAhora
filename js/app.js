//obtener latitud y longitud
 navigator.geolocation.getCurrentPosition(exito,error,opciones);
 function exito(pos){
 	var crd = pos.coords;
 	displayLocation(crd.latitude, crd.longitude);// si get position es exitosa, llamar a display location.
 	searchWeather(crd.latitude, crd.longitude);// si get position es exitosa, llamar a display location.
 };
 function error(err){
 	console.warn(`ERROR (${err.code}) : ${err.message}`);
 };
 var opciones = {
 	timeout: 5000,
 	maximumAge:0
 };
//obtener direccion mediante latitud y longitud
function displayLocation(latitude,longitude){
	var request = new XMLHttpRequest();
	var api= `AIzaSyAKdYTRhm2RYqdmpP5n041oJJZiC7FXxfA`;
	var method = `GET`;
	var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=` + latitude + `,` + longitude + `&key=` + api;
	var async = true;

	request.open(method, url, async);
	request.onreadystatechange = function(){
		if(request.readyState  == XMLHttpRequest.DONE && request.status === 200){
			var data = JSON.parse(request.responseText);
			var address = data.results[0];
 			var ciudad = address.address_components[2]["long_name"];
		 	var direccion = address.formatted_address.split(",");
		 	var pais = direccion[2];
			$("#lugar ").text(ciudad + " " + pais);
 
			var d = new Date();
			var m = d.getDate();
			var n = weekday[d.getDay()];
			$("#fecha").text(n + " " + m);
		}
	};
	request.send();
};

var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";


 function Weather(temperatura,descripcion,icono){
 	this.temperatura = temperatura;
 	this.descripcion = descripcion;
 	this.icono  = icono;
 }

function searchWeather(latitude,longitude){
 
		var http = new XMLHttpRequest();
		var url  =  `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude} `;
		var method = "GET";

		http.open(method, url,true);
		http.onreadystatechange = function(){
			if(http.readyState  == XMLHttpRequest.DONE && http.status === 200 ){
				var data = JSON.parse(http.responseText);
				console.log(data);
				var temperatura = data.main.temp;
				var descripcion = data.weather[0].description;
				var icono =  data.weather[0].icon;
				myWeather = new Weather(temperatura,descripcion,icono);
				updateWeather(myWeather);
				console.log(icono);
				
			}else if(http.readyState === XMLHttpRequest.DONE){
				alert("Algo no funciona.");
			}
		};

		http.send();
	}

function updateWeather(weather){
				$("#temperatura").text(weather.temperatura + "°c");
				$("#descripcion").text(weather.descripcion);
				$("#icono").html(`<img src="${weather.icono}">`);

				$("#temperatura").on("click",changeMetric);

}

function change(){
 	var celsius = true;
	return function(){
			var temp = myWeather.temperatura;
				if(celsius){
					var f = 1.8 *  temp + 32 ;
					myWeather.temperatura = f;
					$("#temperatura").text(f +"°f");
					celsius = false;
					console.log(f, myWeather.temperatura);
				}else{
					console.log(temp);
					var c =  (temp - 32) / 1.8  ;
					myWeather.temperatura = c;
					$("#temperatura").text(c +"°c");
					celsius = true;
				}

	}
};
var changeMetric = change();

