const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./test.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
});
var autopopSQL = "SELECT Name FROM Course WHERE Department_ID='ENG'";
var courses = [];

db.all(autopopSQL, [], (err, rows) => {
    if (err) throw err;
    rows.forEach((row) => {
        courses.push(row);
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
});

module.exports = courses;
