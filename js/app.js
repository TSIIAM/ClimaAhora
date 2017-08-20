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
			$("#ciudad").text(ciudad);
			$("#pais").text(pais);	
		}
	};
	request.send();
};
 
function searchWeather(latitude,longitude){
 
		var http = new XMLHttpRequest();
		var APIKEY = "848ef7adaf8ccc408f95c89cb032bfbf";
		var url  =  `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID={APIKEY}`;
		var method = "GET";

		http.open(method, url);
		http.onreadystatechange = function(){
			if(http.readyState  == XMLHttpRequest.DONE && http.status === 200 ){
				var data = JSON.parse(http.responseText);
				console.log(data);	
			}else if(http.readyState === XMLHttpRequest.DONE){
				alert("Algo no funciona.");
			}
		};

		http.send();
	}




