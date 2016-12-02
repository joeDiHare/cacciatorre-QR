function makeChart(){
  setTimeout(function() {
  // READ FROM SPREADSHEET & DISPLAY CHART ~~ ~~ ~~ ~~ ~~ ~~ ~~
  var spreadsheetId = "1hjM_5TLlXrg5Bi3VE3x7azqddlFmjHUgWsMmm5x9rNo";
  var url = "https://spreadsheets.google.com/feeds/list/"+spreadsheetId+"/od6/public/basic?alt=json";
  $.get({
    url: url,
    success: function(response) {
      var data = response.feed.entry,
          len = data.length,
          i = 0,
          parsedData = [];
      for (i = 0; i < len; i++) {
        parsedData.push({
          label: data[i].title.$t,
          value: data[i].content.$t.split(/[: ]+/).pop() // get last element
        });
      }
      FusionCharts.ready(function() {
      var chart = new FusionCharts({
          type: 'bar2d',
          renderAt: 'chart-container',
          width: '90%',
          height: '1000',
          dataFormat: 'json',
          dataSource: {
            "chart": {
          // caption configuration
          "caption": "Indizi completati per squadra",
          "captionFontBold": "0",
          "captionFontSize": "20",
          // x and y axes configuration
          "xAxisName": "",
          "xAxisNameFontSize": "18",
          "xAxisNameFontBold": "0",
          "yAxisName": "I n d i z i   R i s o l t i",
          "yAxisNameFontSize": "25",
          "yAxisNameFontBold": "0",
          "setAdaptiveYMin": "1",
          "showLimits": "1",
          "yAxisMinValue":"0",
          "yAxisMaxValue":"8",
          // general chart configuration
          "baseFont": "Open Sans",
          "paletteColors": "#2AA992",
          "plotFillAlpha": "70",
          "usePlotGradientColor": "0",
         //  "numberPrefix": "#",
         //  "numberSuffix": "",
          "bgcolor": "#FFFFFF", //"#202C3D",
          "bgalpha": "95",
          "canvasbgalpha": "0",
          "basefontcolor": "#202C3D", //#F7F3E7
          "showAlternateHGridColor": "0",
          "divlinealpha": "50",
          "divlinedashed": "0",
          "rotateyaxisname": "1",
          "canvasbordercolor": "#FFFFFF", //"#FFF",
          "canvasborderthickness": ".3",
          "canvasborderalpha": "100",
          "showValues": "0",
          "plotSpacePercent": "12",
          "showPlotBorder": "0",
          "plotBorderColor": "#FFFFFF", //"#2AA992",
          "plotBorderThickness": "1",
          "labelFontSize": "30",
          "outCnvBaseFontSize": "30",
          // tooltip configuration
          "toolTipBgColor": "#000",
          "toolTipPadding": "12",
          "toolTipBorderRadius": "3",
          "toolTipBorderThickness": "1",
          "toolTipBorderColor": "#000000",//"#ccc",
          "toolTipBgAlpha": "0",//60
          "plotToolText": "<div class='plotToolText'>$dataValue indizi completati</div>"
          },
        "data": parsedData
        }
      })
      .render();
    });
  }
  });
  }, timeout_chart);
}
