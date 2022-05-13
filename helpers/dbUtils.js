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

const viewAllDepartments = () => {};

const viewAllRoles = () => {};

const viewAllEmployees = () => {};

const addDepartment = () => {};

const addRole = () => {};

const addEmployee = () => {};

const updateEmployeeRole = () => {};

const listAllDepartments = () => {};

const listAllRoles = () => {};

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
