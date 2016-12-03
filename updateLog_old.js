function updateLog(used_help, used_solution, solved, incorrect_place, incorrect_psw){
  var sheetsuUrlLog = "https://sheetsu.com/apis/v1.0/0c52c1f265dc/sheets/LOG";
  var API_KEY    = 'vVMy5ukvxGRu6jrvpC5A';
  var API_SECRET = 'EHcLf9fxyyy7iqCW63yEpBxqpNtwtMmYhnDRkTAF';

  var data_ip = $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
  console.log(JSON.stringify(data, null, 2));
  return data;
  });

  console.log('data_ip: '+JSON.stringify(data_ip, null, 2));

  // valIP.ip        = data.ip;
  // valIP.latitude  = data.latitude;
  // valIP.longitude = data.longitude;

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
   'IP': valIP.ip
    }
    console.log(valIP.ip)
    console.log(data.IP)

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){

        console.log('gps through gmaps'+ data.IP)

        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        var accuracy  = position.coords.accuracy;

        data['latitude'] = latitude;
        data['longitude']=longitude;
        data['accuracy'] = accuracy;
        $.ajax({
          url: sheetsuUrlLog,
          //  headers: {"Authorization": "Basic " + btoa(API_KEY + ":" + API_SECRET)},
          //  data: JSON.stringify(data),
          data: data,
          dataType: 'json',
          type: 'POST',
          success: function(data) { console.log(data); document.getElementById('clue').innerHTML=data['accuracy'];},
          error:   function(data) { console.log(data); document.getElementById('clue').innerHTML=data['accuracy'];} // handling error response
        });

     },
    // if there is an error fetching the gps...
    function error(msg){
       console.log('gps through IP')
       alert('gps through ip;')
       data['latitude']= valIP.latitude;
       data['longitude']=valIP.longitude;
       data['accuracy']= 1000;

       $.ajax({
         url: sheetsuUrlLog,
         //  headers: {"Authorization": "Basic " + btoa(API_KEY + ":" + API_SECRET)},
         //  data: JSON.stringify(data),
         data: data,
         dataType: 'json',
         type: 'POST',
         success: function(data) { console.log(data); document.getElementById('clue').innerHTML='gps ip:'+data['accuracy'];},
         error:   function(data) { console.log(data); document.getElementById('clue').innerHTML='gps ip: err: '+data['accuracy'];} // handling error response
       });

       document.getElementById('clue').innerHTML=msg.code+' '+msg.message;
       console.log(msg); alert('Abilita il GPS please :)');

    }, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
  }else{
    // alert("GPS non e' supportato dal tuo browser :(");
    console.log('gps through IP')

    data['latitude']= valIP.latitude;
    data['longitude']=valIP.longitude;
    data['accuracy']= 1000;

    $.ajax({
      url: sheetsuUrlLog,
      //  headers: {"Authorization": "Basic " + btoa(API_KEY + ":" + API_SECRET)},
      //  data: JSON.stringify(data),
      data: data,
      dataType: 'json',
      type: 'POST',
      success: function(data) { console.log(data); document.getElementById('clue').innerHTML='odd'+data['accuracy'];},
      error:   function(data) { console.log(data); document.getElementById('clue').innerHTML='odd err'+data['accuracy'];} // handling error response
    });

   }

 }
