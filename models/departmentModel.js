// Gets all Program Rows from DB

var department_data = ["Engineering"];
/*
//creating vars for sqlite server
const sqlite3 = require('sqlite3').verbose();

//connects to the db
let db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

let sql = 'SELECT * FROM Department';
 
//gets all for the sql command
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    // console.log(row);
    department_data.push(row);
  });
  console.log("dept_data pulled successfully.");
});

console.log(department_data);

//closes the connection 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

console.log(department_data);
*/

module.exports = department_data;