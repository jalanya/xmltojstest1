/*
Using https://www.npmjs.com/package/xml2js
*/
var returnJSONResults = function(baseName, queryName) {
  var XMLPath = "scenario-lucas-bunny-denied.xml";
  var rawJSON = loadXMLDoc(XMLPath);
  function loadXMLDoc(filePath) {
    var fs = require('fs');
    var xml2js = require('xml2js');
    var json;
    try
    {
      var fileData = fs.readFileSync(filePath, 'UTF-8');
      var parser = new xml2js.Parser();

      parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
          json = JSON.stringify(result);

          var response = {};
          response.TransactionNumber = result.ApplicantScreening.Response[0].TransactionNumber;
          response.ApplicantDecision = result.ApplicantScreening.Response[0].ApplicantDecision;
          response.ReportDate = result.ApplicantScreening.Response[0].ReportDate;
          response.Status = result.ApplicantScreening.Response[0].Status;
          response.RequestID_Returned = result.ApplicantScreening.Response[0].RequestID_Returned;
          response.BackgroundReport = result.ApplicantScreening.Response[0].BackgroundReport.toString();
          /*"ApplicantDecision":
              [{
                        "applicantName": "Smith, Edgar", "result": "APPROVED"
                      },
                      {
                         "applicantName": "Smith, Florence", "result": "APPROVED"
               }
          ],*/
          console.log('response.TransactionNumber ', response.TransactionNumber);
          console.log('response.ApplicantDecision ', response.ApplicantDecision);
          console.log('response.ReportDate ', response.ReportDate);
          console.log('response.Status ', response.Status);
          console.log('response.RequestID_Returned ', response.RequestID_Returned);

          console.log('Saving response.BackgroundReport in HTML file');

          fs.writeFile("scenario-lucas-bunny-denied.html", response.BackgroundReport, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
          });

          console.log('Saving in JSON file');

          fs.writeFile("scenario-lucas-bunny-denied.json", json, function(err) {
            if(err) {
               return console.log(err);
            }
            console.log("The JSON file was saved!");
          });
          
      });
      console.log("File '" + filePath + "/ was successfully read.\n");
      return json;
    } catch (ex) {
      console.log(ex)
    }
  }
}();
