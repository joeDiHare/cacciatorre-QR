function updateSheet(val){
  var sheetsuUrl = "https://sheetsu.com/apis/v1.0/0c52c1f265dc";
  var API_KEY    = 'vVMy5ukvxGRu6jrvpC5A';
  var API_SECRET = 'EHcLf9fxyyy7iqCW63yEpBxqpNtwtMmYhnDRkTAF';
  var data = {
   team_name: match_results[2],
   ["indizio_"+match_results[6]]: val
   };
   $.ajax({
     url: sheetsuUrl+'/team_name/'+match_results[2],
     headers: {"Authorization": "Basic " + btoa(API_KEY + ":" + API_SECRET)},
     data: data,
     dataType: 'json',
     type: 'PATCH',
     // success: function(data) { console.log(data); },
     error:   function(data) { console.log(data); } // handling error response
   });
 }
