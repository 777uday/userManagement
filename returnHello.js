// old code: before adding JWT

function extractInputs(req, callback){
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    var data = JSON.parse(body);
    console.log("extractInputs:body:"+JSON.stringify(data));
    callback(data);
  });
}


function authenticateUser(userData, callback){
  if (userData.username === 'uday' && userData.password == 'uday') callback({status:true, message:"login successful"})
  else callback({status:false, message:"login failed"})
}


function userLogin(req, res){
  extractInputs(req, function (inputs){
    authenticateUser(inputs, function(loginStatus){
      res.send(loginStatus);
    });
  });
}

module.exports = {
  bar: function (req, res) {
    userLogin(req, res);
  }
};
