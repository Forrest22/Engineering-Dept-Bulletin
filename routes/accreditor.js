var express = require('express');
var router = express.Router();
// Load the data model
var accreditorModel = require('../models/accreditorModel');
var programModel = require('../models/programModel')

//*************************************************//
// All of these routes are relative to /accreditor      //
//*************************************************//

// GET to Add Accreditor page
router.get('/addaccreditor', index);

// POST data from 
router.post('/record', record_data);


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

function record_data(req, res, next) {
	console.log(req.body); // show in the console what the user entered
	accreditorModel.push(req.body); // Add the user data to the accreditor_data dataset
	res.redirect('/accreditor/addaccreditor');	// reload the page
}

// Export the router, required in app.js
module.exports = router;
