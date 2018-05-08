// Gets all Program Rows from DB

var department_data = [];

//creating vars for sqlite server
const sqlite3 = require('sqlite3').verbose();

//connects to the db
let db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    throw err;
  }
  // console.log('Connected to the database.');
});

let sql = 'SELECT DISTINCT Degree FROM Program';
 
//gets all for the sql command
db.all(sql, [], (err, rows) => {
  if (err) {
    console.log(err);
  }
  // console.log(rows);
  rows.forEach((row) => {
    // console.log(row['Degree']);
    department_data.push(row);
  });
  // console.log("dept_data pulled successfully.");
});

// console.log(department_data);

//closes the connection 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  // console.log('Close the database connection.');
});

// console.log(department_data);


module.exports = department_data;