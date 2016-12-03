function updateLog(used_help, used_solution, solved, incorrect_place, incorrect_psw){
  var sheetsuUrlLog = "https://sheetsu.com/apis/v1.0/0c52c1f265dc/sheets/LOG";
  var API_KEY    = 'vVMy5ukvxGRu6jrvpC5A';
  var API_SECRET = 'EHcLf9fxyyy7iqCW63yEpBxqpNtwtMmYhnDRkTAF';

  var dataLog = { 'timestamp': (new Date()).toString(),
               'Team_name': match_results[2],
               'Current_Position': match_results[6],
               'Current_Position_id': match_results[3],
               'Next_clue': match_results[4],
               'Next_clue_id': match_results[5],
               'Used_Help': used_help,
               'Used_Solution':used_solution,
               'Solved': solved,
               'Incorrect_place': incorrect_place,
               'Incorrect_psw': incorrect_psw,
               'IP': '0'}
// Get IP
  $.getJSON('//api.ipify.org?format=jsonp&callback=?',
      dataLog,
      function(data) { dataLog['IP'] = data.ip; }); // console.log(JSON.stringify(data, null, 2));

  var tryAPIGeolocation = function() {
	jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC3lqec8rY4P221IG6LF5skEiyP9j1L_C4", function(success) {
		apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
    console.log("API Geolocation made it! \n\n"+coords.latitude);
    // document.getElementById('clue').innerHTML+="API geolocation made it!\n\n lat:"+coords.latitude;

  })
  .fail(function(err) {
    console.log("API Geolocation error! \n\n"+err);
    // document.getElementById('clue').innerHTML+="API geolocation error! "+err;
    // position.coords.latitude  = 0; position.coords.longitude = 0; position.coords.accuracy  = 0;
    writeLog(position);
  });
  };
  var apiGeolocationSuccess = function(position) {
	   console.log("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
    //  document.getElementById('clue').innerHTML+="API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude;
     writeLog(position);
  };

  var browserGeolocationSuccess = function(position) {
	   console.log("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
    //  document.getElementById('clue').innerHTML+="Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude;
     writeLog(position);
  };

  var browserGeolocationFail = function(error) {
    switch (error.code) {
      case error.TIMEOUT:
        console.log("Browser geolocation error !\n\nTimeout.");
        // document.getElementById('clue').innerHTML+="Browser geolocation error !\n\nTimeout.";
        // position.coords.latitude  = 0; position.coords.longitude = 0; position.coords.accuracy  = 0;
        writeLog(position);
        break;
      case error.PERMISSION_DENIED:
        if(error.message.indexOf("Only secure origins are allowed") == 0) {
          tryAPIGeolocation();
        }
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Browser geolocation error !\n\nPosition unavailable.");
        // document.getElementById('clue').innerHTML+="Browser geolocation error !\n\nPosition unavailable.";
        writeLog(position);
        break;
    }
  };
  var tryGeolocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
      	browserGeolocationSuccess,
        browserGeolocationFail,
        {maximumAge: 2*60*1000, timeout: 5000, enableHighAccuracy: true});
    }
  };

  var writeLog = function(position){
    // console.log(dataLog)
    dataLog['latitude'] = position.coords.latitude;
    dataLog['longitude']= position.coords.longitude;
    dataLog['accuracy'] = position.coords.accuracy;
    console.log(dataLog)
    $.ajax({
      url: sheetsuUrlLog,
      //  headers: {"Authorization": "Basic " + btoa(API_KEY + ":" + API_SECRET)},
      data: dataLog,
      dataType: 'json',
      type: 'POST',
      success: function(datam) { console.log(datam); document.getElementById('clue').innerHTML+='ok'+datam;},
      error:   function(datam) { console.log(datam); document.getElementById('clue').innerHTML+='err:'+datam;} // handling error response
    });
  }

  tryGeolocation();

} //EoF
