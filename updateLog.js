function updateLog(used_help, used_solution, solved, incorrect_place, incorrect_psw){
  var sheetsuUrlLog = "https://sheetsu.com/apis/v1.0/0c52c1f265dc/sheets/LOG";
  var API_KEY    = 'vVMy5ukvxGRu6jrvpC5A';
  var API_SECRET = 'EHcLf9fxyyy7iqCW63yEpBxqpNtwtMmYhnDRkTAF';

  var val = {};
  $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
  // console.log(JSON.stringify(data, null, 2));
  val.ip        = data.ip;
  });

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      var accuracy  = position.coords.accuracy;

      var data = {
       'timestamp': (new Date()).toString(),
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
       'IP':val.ip,
       'latitude':latitude,
       'longitude':longitude,
       'accuracy':accuracy
       };
       $.ajax({
         url: sheetsuUrlLog,
        //  headers: {"Authorization": "Basic " + btoa(API_KEY + ":" + API_SECRET)},
        //  data: JSON.stringify(data),
         data: data,
         dataType: 'json',
         type: 'POST',
         success: function(data) { console.log(data); },
         error:   function(data) { console.log(data); } // handling error response
       });

      },function error(msg){alert('Please enable your GPS position future.');
    }, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
  }else {
      alert("Geolocation API is not supported in your browser.");
  }


 }
