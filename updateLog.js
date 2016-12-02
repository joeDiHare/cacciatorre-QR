function updateSheet(val){
  var sheetsuUrlLog = "https://sheetsu.com/apis/v1.0/0c52c1f265dc/sheets/LOG";
  var API_KEY    = 'vVMy5ukvxGRu6jrvpC5A';
  var API_SECRET = 'EHcLf9fxyyy7iqCW63yEpBxqpNtwtMmYhnDRkTAF';


   // jQuery snippet for changing HTML form into JSON
  (function ($) {
    $.fn.serializeFormJSON = function () {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function () {
        if (o[this.name]) {
          if (!o[this.name].push) { o[this.name] = [o[this.name]]; }
          o[this.name].push(this.value || '');
        } else { o[this.name] = this.value || ''; }
      });
      return o;
    };
  })(jQuery);

  $('#form').submit(function(e) {
    // prevent default submiting form
    e.preventDefault();

    // serialize data to JSON
    var data = $('#form').serializeFormJSON();

    $.ajax({
      url: sheetsuUrlLog,
      headers: {"Authorization": "Basic " + btoa(API_KEY + ":" + API_SECRET)},
      data: data,
      dataType: 'json',
      type: 'POST',

      // place for handling successful response
      // showing (redirecting to) something like /thanks.html
      // page could be a good idea
      success: function(data) {
        window.location.href = 'thank_you.html';
      },


      error: function(data) {console.log(data);} // handling error response
    });

    return false;
  });


 }
