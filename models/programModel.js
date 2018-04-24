// Gets all Program Rows from DB

var program_data = [];

//creating vars for sqlite server
const sqlite3 = require('sqlite3').verbose();

//connects to the db
let db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
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
  console.log("program_data pulled successfully.");
});

console.log(program_data);

//closes the connection 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

console.log(program_data);

module.exports = program_data;