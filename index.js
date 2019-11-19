const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;

// internal imports
var tools = require('./returnHello');
var Hackit = require('./Hackit');
var collectInputs = require('./collectInput');
var Users = require('./userManagement');

app.get('/', (req, res) => {
  res.send('\n\nHello, world!\n\n');
});

app.post('/getUserDetails', (req, res) => {

  res.send(['uday','sai','kumar']);
});

app.post('/mongodb', (req, res) => {

	MongoClient.connect("mongodb://localhost:27017/MyDb", function(err, db) {
		if (err) throw err;
		var dbo = db.db("MyDb");
		dbo.collection("inventory").findOne({}, function(err, result) {
			if (err) throw err;
			res.send(result);
			db.close();
		});
		// res.send(dbo.getCollectionNames());

		db.close();
	});
});

app.post('/mongodbInsert', (req, res) => {

    // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {

      db.collection('Persons', function (err, collection) {

          collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
          collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
          collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });



          db.collection('Persons').count(function (err, count) {
              if (err) throw err;

              console.log('Total Rows: ' + count);
          });
      });

  });
});

app.post('/loginDemo', (req, res) => {
  tools.bar(req, res);
});

app.post('/Hackit', (req, res) => {
  Hackit.junkData(req, res);
});

app.post('/getInputs', (req, res) => {
	collectInputs(req, function callback(inputs){
		res.send(inputs);
	});
  });

  // User Management

app.post('/registerUser', (req, res) => {
	collectInputs(req, function callback(inputs){
		Users.createUser(inputs, (CB)=>{
			res.send(CB);
		});
	});
});

app.post('/getUsers', (req, res) => {
		Users.getUsers((CB)=>{
			res.send(CB);
		});
});

app.post('/getUser', (req, res) => {
	collectInputs(req, function callback(inputs){
		Users.getUser(inputs, (CB)=>{
			res.send(CB);
		});
	});
});

app.post('/updateUser', (req, res) => {
	collectInputs(req, function callback(inputs){
		Users.updateUser(inputs, (CB)=>{
			res.send(CB);
		});
	});
});

app.post('/login', (req, res) => {
	collectInputs(req, function callback(inputs){
		Users.login(inputs, (CB)=>{
			res.send(CB);
		});
	});
});

app.post('/verifyUserToken', (req, res) => {
	collectInputs(req, function callback(inputs){
		Users.verifyUserToken(inputs, (CB)=>{
			res.send(CB);
		});
	});
});

app.listen(port, () => {
  console.log(`listening on port ${ port }`);
});
