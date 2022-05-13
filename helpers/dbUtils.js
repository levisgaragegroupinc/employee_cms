const express = require("express");
const mysql = require("mysql");
const consoleTable = require("console.table");

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "XC04stareld57*",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// INCLUDE THE FOLLOWING OPERATIONS (plus BONUS)
// View all departments
// View all roles
// View all employees
// Veiw employees by manager (BONUS)
// View employees by department (BONUS)
// View sum of salaries by department (BONUS)

// Add department
// Add role
// Add employee

// Update an employee role
// Update employee managers (BONUS)

// Delete department (BONUS)
// Delete role (BONUS)
// Delete employee (BONUS)

// ************
// VIEW ALL OF SOMETHING HELPER FUNCTIONS
// ************

// UTIL HELPER FUNCTION: IN-PROGRESS!
const viewAllDepartments = () => {};

// UTIL HELPER FUNCTION: IN-PROGRESS!
const viewAllRoles = () => {};

// UTIL HELPER FUNCTION: IN-PROGRESS!
const viewAllEmployees = () => {};

// ************
// ADD SOMETHING HELPER FUNCTIONS
// ************

// UTIL ADD DEPARTMENT HELPER FUNCTION: READY!
const addDepartment = (data) => {
  console.log(data);
  db.query(
    "INSERT INTO department (name) VALUES (?)",
    data.name,
    function (err, res) {
      console.log(res);
    }
  );
};

// ALTERNATIVE WAY?
// const addDepartment = (data) => {
//   db.query("INSERT INTO department (name) VALUES (?)", data.name, (err, res) => {
//     if (err) {
//       res.status(400).json({ error: err });
//       return;
//     }
//     res.json({
//       message: "Success",
//       data: data.name,
//     });
//   });
// };

// UTIL ADD ROLE HELPER FUNCTION: READY!
const addRole = (data) => {
  console.log(data);
  db.query(
    "INSERT INTO role (name) VALUES (?)",
    data.role,
    function (err, res) {
      console.log(res);
    }
  );
};

// UTIL ADD EMPLOYEE HELPER FUNCTION: READY!
const addEmployee = (data) => {
  console.log(data);
  db.query(
    "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, (SELECT id from role WHERE title = ?))",
    data.first_name,
    data.last_name,
    data.role_id,
    function (err, res) {
      console.log(res);
    }
  );
};

// ************
// UPDATE SOMETHING HELPER FUNCTIONS
// ************

// UTIL HELPER FUNCTION: IN-PROGRESS!
const updateEmployeeRole = () => {};

// ************
// PROVIDE LIST FOR PROMPT CHOICES HELPER FUNCTIONS
// ************

// UTIL HELPER FUNCTION: IN-PROGRESS!
const listAllDepartments = () => {};

// UTIL HELPER FUNCTION: IN-PROGRESS!
const listAllRoles = () => {};

// UTIL HELPER FUNCTION: IN-PROGRESS!
const listAllEmployees = () => {};

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  listAllDepartments,
  listAllRoles,
  listAllEmployees,
};
