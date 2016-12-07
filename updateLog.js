function updateLog(used_help, used_solution, solved, incorrect_place, incorrect_psw){
  var sheetsuUrlLog = "https://sheetsu.com/apis/v1.0/0c52c1f265dc/sheets/LOG";
  var API_KEY    = 'vVMy5ukvxGRu6jrvpC5A';
  var API_SECRET = 'EHcLf9fxyyy7iqCW63yEpBxqpNtwtMmYhnDRkTAF';

  // var position;
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

  var browserGeolocationSuccess = function(position) {
	   console.log("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude+ "\nacc = " + position.coords.accuracy);
     console.log(position);
    //  document.getElementById('clue').innerHTML+="Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude;
     writeLog(position);
  };
  var browserGeolocationFail = function(error) {
    console.log("Browser geolocation error: >> "+error.message);
    tryAPIGeolocation();
  };
  var tryAPIGeolocation = function() {
  jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC3lqec8rY4P221IG6LF5skEiyP9j1L_C4", function(success) {
    apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
    console.log("API Geolocation made it! \n\n lat:"+success.location.lat+"; lng:"+success.location.lng);
    // document.getElementById('clue').innerHTML+="API geolocation made it!\n\n lat:"+coords.latitude;
  })
  .fail(function(err) {
    console.log("API Geolocation error >> "+err);
    // document.getElementById('clue').innerHTML+="API geolocation error! "+err;
    writeLog(undefined);
  });
  };
  var apiGeolocationSuccess = function(position) {
     console.log("API geolocation success!\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
    //  document.getElementById('clue').innerHTML+="API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude;
     writeLog(position);
  };
  var tryGeolocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
      	browserGeolocationSuccess,
        browserGeolocationFail,
        {maximumAge: 8*60*1000, timeout: 5000, enableHighAccuracy: true});
    }
  };

  var writeLog = function(position){
    // console.log(dataLog)
    if (position !== 'undefined' && position) {
      dataLog['latitude'] = position.coords.latitude;
      dataLog['longitude']= position.coords.longitude;
      dataLog['accuracy'] = position.coords.accuracy;
    } else{
      dataLog['latitude'] = 0;
      dataLog['longitude']= 0;
      dataLog['accuracy'] = 0;
    }
    console.log(dataLog)
    $.ajax({
      url: sheetsuUrlLog,
      //  headers: {"Authorization": "Basic " + btoa(API_KEY + ":" + API_SECRET)},
      data: dataLog,
      dataType: 'json',
      type: 'POST',
      success: function(datam) { console.log(datam);},
      error:   function(datam) { console.log(datam);} // handling error response
    });
  }

  tryGeolocation();

} //EoF
