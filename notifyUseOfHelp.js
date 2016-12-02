function notifyUseOfHelp(help_type){
  var sheetsuUrl = "https://sheetsu.com/apis/v1.0/0c52c1f265dc";
  var API_KEY = 'vVMy5ukvxGRu6jrvpC5A';
  var API_SECRET = 'EHcLf9fxyyy7iqCW63yEpBxqpNtwtMmYhnDRkTAF';
  var data = {
   team_name: match_results[2],
   [help_type+'_'+match_results[6]]: "1"
   };
  console.log(help_type+'_'+match_results[6]);
   $.ajax({
     url: sheetsuUrl+'/team_name/'+match_results[2],
    //  headers: {"Authorization": "Basic " + btoa(API_KEY + ":" + API_SECRET)},
     data: data,
     dataType: 'json',
     type: 'PATCH',
     success: function(data) { if(help_type=='HelpMe'){
                                  updateLog(1,0,0,0,0); // log: used_help
                                }else{
                                  updateLog(0,1,0,0,0); // log: used_solution
                                }
                              },
     error:   function(data) { console.log(data); } // handling error response
   });
}
