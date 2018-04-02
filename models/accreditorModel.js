// Data stub to used for testing.
// This will be changed when a database is setup


var accreditor_data = 
[
  	{name: 'Frodo', program: 'Program 1'}, 
  	{name: 'Sam', program: 'Program 2'},
  	{name: 'Peregrin', program: 'Program 3'} 
];

function addAccreditor(name, program){
	console.log("addAccreditor");
	console.log("Name: " + name + ", Program: " + program);
	accreditor_data.push("name: " + name + ", program: " + program + ", description: " + description);
	console.log(accreditor_data);
};

module.exports = accreditor_data;