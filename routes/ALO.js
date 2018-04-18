var express = require('express');
var router = express.Router();
// Load the data model
var accreditorModel = require('../models/accreditorModel');
var programModel = require('../models/programModel');
var sqlite3 = require('sqlite3').verbose();
// var popups = require('popups');



//*************************************************//
// All of these routes are relative to /accreditor      //
//*************************************************//

// GET to Add Accreditor page
router.get('/addALO', index);

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
  res.render(
  	'ALO', 
  	{ title: 'Add ALO',
    program: programModel,
    accreditor: accreditorModel
  }
  );
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
      console.log("Match for Program_ID!");
      Program_ID = programModel[i].Program_ID;
    }
    else if (i == programModel.length){
      return console.log("Oops, no match for Program_ID.");
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

  

  //Does these queries in order
  db.serialize(() => {
    runSQL = true;
    // Checks to see if the name exists in the database
    db.each("SELECT Name FROM Accreditation_Body_Program_Map WHERE Name = '" + POST.name + "'", function(err, row) {
      console.log(row);
      if(row.Name == POST.name){
        runSQL = false;
        console.log("runSQL: ");
        console.log(runSQL);
      }
    });

    // If the name doesn't exist
    // **STILL RUNS EVEN IF FALSE?!?! WHAT?!?!?**
    if (runSQL) {
      // Insert into Accreditation_Body_Program_Map Table
      sql = 'INSERT INTO Accreditation_Body_Program_Map (Name, Program) VALUES (?, ?)';
      params = [POST.name, Program_ID];
      // console.log(sql);
      // console.log(params);

      db.run(sql, params, function(err) {
        if (err) {
          console.log("YOU DONE GOOFED.");
          return console.log(err.message);
        }
        // get the last insert id
        console.log("Accreditation_Body_Program_Map insert success.");
      });

      // Insert into ALO Table
      sql = 'INSERT INTO ALO(Accreditor, Description) VALUES (?, ?)';
      params = [POST.name, POST.description];
      // console.log(sql);
      // console.log(params);

      db.run(sql, params, function(err) {
        if (err) {
          //NEED TO ERASE PREV INSERT OR CHECK CONSTRAINTS and undo anything I added
          console.log("YOU DONE GOOFED.");
          return console.log(err.message);
        }
        // get the last insert id
        console.log("ALO insert success.");
      });
    }
    else{
      console.log("Error message!");
      //uses the popups module to alert the user that program already exists
      popups.alert({
        content: 'Error! Accreditor already exists!'
      });
    }
  });

  //Deletes the cache of accreditor model to try and update the HTML properly but isn't working :/
  delete require.cache[require.resolve('../models/accreditorModel')];
  
  // close the database connection
  db.close();
}

function record_data(req, res, next) {
	// console.log(req.body.program); // show in the console what the user entered
  console.log(req.body);

  addToDB(req.body);
  
	accreditorModel.push(req.body); // Add the user data to the accreditor_data dataset
	res.redirect('/accreditor/addaccreditor');	// reload the page
}

// Export the router, required in app.js
module.exports = router;
