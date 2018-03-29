var express = require('express');
var router = express.Router();
// Load the data model
var accreditorModel = require('../models/accreditorModel');
var programModel = require('../models/programModel');
var sqlite3 = require('sqlite3').verbose();



//*************************************************//
// All of these routes are relative to /accreditor      //
//*************************************************//

// GET to Add Accreditor page
router.get('/addaccreditor', index);

// POST data from 
router.post('/record', record_data);

console.log(record_data);


//
// Functions responding to HTTP requests
//
function index(req, res, next) {
	// parameters for res.render(par1, par2)
	// par1 : a view in the views folder
	// par2 : data to be used when rendering the view
  res.render(
  	'accreditor', 
  	{ title: 'Add Accreditor',
    program: programModel,
    accreditor: accreditorModel
  }
  );
}

function addToDB(POST){
  //Checks for a match of data
  var i;
  for (i = 0; i < programModel.length; i++){
    var temp = String(programModel[i].Degree) + ' -- ' + String(programModel[i].Concentration);

    if(String(POST.program) === temp){
      console.log("Match!");
      break;
    }
    else{
      console.log("Oops.");
      return
    }
  }

  //creating vars for sqlite server
  //connects to the db
  let db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the test database.');
  });

  //Counts num of rows in table to get Unique ID
  var sql = 'SELECT COUNT(*) AS numRows FROM ALO';  
  console.log("Counting Rows");

  var rows;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows = (rows.numRows);
    console.log(rows)
  });


  // Insert into Accreditation_Body_Program_Map Table
  sql = 'INSERT INTO Accreditation_Body_Program_Map (Name, Program)\n' +
    'VALUES (\'' + POST.name + '\',' + programModel[i].Program_ID + ')';
  console.log(sql);

  db.run(sql, POST, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log("Accreditation_Body_Program_Map success.");
  });

  // Insert into ALO Table
  sql = 'INSERT INTO ALO (ALO_ID, Accreditor)\n' + 
    'VALUES (' + (rows+1) + ', \'' + POST.name + '\')';
  console.log(sql);

  db.run(sql, POST, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log("ALO success.");
  });
  
  // close the database connection
  db.close();
}

function record_data(req, res, next) {
	// console.log(req.body.program); // show in the console what the user entered
  console.log(req.body);

  addToDB(req.body)
  
	accreditorModel.push(req.body); // Add the user data to the accreditor_data dataset
	res.redirect('/accreditor/addaccreditor');	// reload the page
}

// Export the router, required in app.js
module.exports = router;
