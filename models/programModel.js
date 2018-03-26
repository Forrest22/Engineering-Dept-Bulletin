// Data stub to used for testing.
// This will be changed when a database is setup

var program_data = [];

//creating vars for sqlite server
const sqlite3 = require('sqlite3').verbose();

//connects to the db
let db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the test database.');
});

let sql = 'SELECT * FROM Program';
 
//gets all for the sql command
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    // console.log(row);
    program_data.push(row);
  });
});

//closes the connection 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

module.exports = program_data;
