var express = require('express');
var router = express.Router();
// Load the data model
var accreditorModel = require('../models/accreditorModel');
var programModel = require('../models/programModel');
var ALOmodel = require('../models/ALOmodel');
var sqlite3 = require('sqlite3').verbose();
// var popups = require('popups');



//*************************************************//
// All of these routes are relative to /accreditor      //
//*************************************************//

// GET to Add ALO page
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
  // console.log(accreditorModel);
  // console.log(ALOmodel);
  res.render(
  	'ALO', 
  	{ title: 'Add ALO',
    program: programModel,
    accreditor: accreditorModel,
    ALO: ALOmodel,
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
      ALO_ID = ALOmodel[i].ALO_ID;
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

  // Insert into KSA_Program_Map Table
  // Nothing on the spreadsheet about SkillLevel
  sql = 'INSERT INTO ALO(Accreditor, Description) VALUES (?, ?);';
  params = [POST.accreditor, POST.description];

  db.run(sql, params, function(err) {
    if (err) {
      return console.log(err.message);
    }
  });

  //Deletes the cache of program model to try and update the HTML properly but isn't working :/
  delete require.cache[require.resolve('../models/ALOmodel')];

  // close the database connection
  db.close();


}

function record_data(req, res, next) {
	// console.log(req.body.program); // show in the console what the user entered
  // console.log(req.body);

  addToDB(req.body);
  
	// accreditorModel.push(req.body); // Add the user data to the accreditor_data dataset
	res.redirect('back');	// reload the page
}

// Export the router, required in app.js
module.exports = router;
