// Gets all Accreditor Rows from DB

var accreditor_data = [];

//creating vars for sqlite server
const sqlite3 = require('sqlite3').verbose();

//connects to the db
let db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

let sql = 'SELECT * FROM ALO';
 
//gets all for the sql command
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
    accreditor_data.push(row);
  });
  console.log("accreditor_data pulled successfully.");
});

//closes the connection 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

module.exports = accreditor_data;