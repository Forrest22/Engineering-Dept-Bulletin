var express = require('express');
var router = express.Router();
// Load the data model
var programModel = require('../models/programModel');
var accreditorModel = require('../models/accreditorModel');
var departmentModel = require('../models/departmentModel');
var autopop = require('../models/autoPop');
var ALOmodel = require('../models/ALOmodel');
var sqlite3 = require('sqlite3').verbose();



//*************************************************//
// All of these routes are relative to /program      //
//*************************************************//

// GET to Add Program page
router.get('/addprogram', index);

// POST data from
router.post('/record', record_data);

// console.log(record_data);


//
// Functions responding to HTTP requests
//
function index(req, res, next) {
	// parameters for res.render(par1, par2)
	// par1 : a view in the views folder
	// par2 : data to be used when rendering the view
  // console.log(ALOmodel);
  // console.log(programModel);
  res.render(
  	'program',
  	{ title: 'Add Program',
      program: programModel,
      accreditor: accreditorModel,
      department: departmentModel,
      classes: autopop,
      ALO: ALOmodel,
    }
    );
  // console.log(programModel);
}

function addToDB(POST){
  //Checks for a match of data, and Program_ID will be the data's Program_ID
  var Program_ID;
  for (var i = 0; i < programModel.length; i++){
    var temp = String(programModel[i].Degree) + ' -- ' + String(programModel[i].Concentration);

    //checks if there's a third option
    if (programModel[i].Option != null){
      temp = temp + ' ' + String(programModel[i].Option);
    }
    // console.log(temp);

    //validating input
    if(String(POST.program) === temp){
      // console.log("Match for Program_ID!");
      Program_ID = programModel[i].Program_ID;
      break;
    }
    else if (i == programModel.length){
      return console.log("Oops, no match for Program & details.");
    }
  }

  // Checks if there's a matching ALO
  var ALO_ID;
  for (var i = 0; i < ALOmodel.length; i++){
    var temp = String(ALOmodel[i].Accreditor);

    //validating input
    if(String(POST.accreditor) === temp){
      // console.log("Match for ALO_ID!");
      ALO_ID = ALOmodel[i].A1LO_ID;
      break;
    }
    else if (i == ALOmodel.length){
      return console.log("Oops, no match for ALO.");
    }
  }

  //creating vars for sqlite server
  //connects to the db
  let db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the test database.');
  });

  // Insert into KSA Table
  var KSA_ID;
  sql = 'INSERT INTO KSA (BloomLevel, Description, Classification) VALUES (?, ?, ?)';
  params = [POST.bloomLevel, POST.description, POST.classification];

  db.run(sql, params, function(err) {
    if (err) {
      return console.log(err.message);
    }

    // Gets the ID of the last insert so I don't have to search for it
    // console.log(this);
    KSA_ID = this.lastID;
    console.log(KSA_ID);

    // console.log("KSA insert success.");
  });

  console.log(KSA_ID);

  // Insert into ALO_KSA_Map Table
  // **Nothing on the UI/sheets about SkillLevel input**
  sql = 'INSERT INTO ALO_KSA_Map(ALO_ID, SkillLevel, KSA_ID) VALUES (?, ?, ?);';
  params = [ALO_ID, 'I', KSA_ID];

  db.run(sql, params, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    // console.log("ALO_KSA_Map insert success.");
  });

  // Insert into KSA_Program_Map Table
  // Nothing on the spreadsheet about SkillLevel
  sql = 'INSERT INTO KSA_Program_Map(KSA_ID, Program_ID) VALUES (?, ?);';
  params = [KSA_ID, Program_ID];

  db.run(sql, params, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    // console.log("KSA_Program_Map insert success.");
  });

  //Deletes the cache of program model to try and update the HTML properly but isn't working :/
  delete require.cache[require.resolve('../models/programModel')];

  // close the database connection
  db.close();
}

function record_data(req, res, next) {
	// console.log(req.body.program); // show in the console what the user entered
  // console.log(req);
  // console.log(res.body);
  // console.log(next);

  // addToDB(req.body);
  // console.log(ALOmodel);
	// programModel.push(req.body); // Add the user data to the program_data dataset
	res.redirect('/program/addprogram');	// reload the page
}

// Export the router, required in app.js
module.exports = router;
