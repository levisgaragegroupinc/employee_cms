const express = require("express");
const path = require("path");
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./helpers/dbUtils");

const mysql = require("mysql");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "XC04stareld57*",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// PROMPTS HERE

// determine what the user choose

// what would you like to do

// QUERIES HERE

// Example calls
app.get("/db", (req, res) => {
  db.query(`SELECT FROM movies_names WHERE id = ?`, 1, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

// SUM the, plus multiple stats on
db.query(
  "SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section",
  function (err, results) {
    console.log(results);
  }
);

// Select all and show how many are in stock true / false.
db.query(
  "SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock",
  function (err, results) {
    console.log(results);
  }
);

// Query database
db.query("SELECT * FROM course_names", function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Hardcoded query: DELETE FROM course_names WHERE id = 3;
db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
