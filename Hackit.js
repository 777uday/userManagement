var _ = require('underscore');

function extractInputs(req, callback){
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var data = JSON.parse(body);
    //   console.log("extractInputs:body:"+JSON.stringify(data));
      callback(data);
    });
  }
  
  function junky(req, res){
    extractInputs(req, function (inputs){
        var junk = inputs.junk;
        var converstationViewData = [], senderList = [];
        junk.map((eachList, index)=>{
            senderList.push(eachList.address); // Contact list
            var eachText = {};
            eachText.number = eachList.address;
            eachText.msg = eachList.body;
            eachText.received = eachList.date;
            converstationViewData.push(eachText);
        });
        senderList = _.uniq(senderList);
        res.send(converstationViewData);
    });
  }
  
  module.exports = {
    junkData: function (req, res) {
      junky(req, res);
    }
  };