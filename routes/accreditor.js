var express = require('express');
var router = express.Router();
// Load the data model
var accreditorModel = require('../models/accreditorModel');
<<<<<<< HEAD
var programModel = require('../models/programModel');

// console.log(programModel);

=======
var programModel = require('../models/programModel')
>>>>>>> 9103207eba2584463f4d6873b8928f1211052029

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
<<<<<<< HEAD
  	{ title: 'Add Accreditor',
      program: programModel,
=======
  	{ title: 'Add Accreditor', 
  	  program: programModel,
>>>>>>> 9103207eba2584463f4d6873b8928f1211052029
  	  accreditor: accreditorModel
  	}
  	);
}

function record_data(req, res, next) {
	console.log(req.body); // show in the console what the user entered


  accreditorModel.addAccreditor(req.body.name, req.body.program); //trying to add data that will cary over

  
	accreditorModel.push(req.body); // Add the user data to the accreditor_data dataset
	res.redirect('/accreditor/addaccreditor');	// reload the page
}

// Export the router, required in app.js
module.exports = router;
