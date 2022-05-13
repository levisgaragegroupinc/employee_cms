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
  listAllDepartments,
  listAllRoles,
  listAllEmployees,
} = require("./helpers/dbUtils");

const mysql = require("mysql");
const consoleTable = require("console.table");
const inquirer = require("inquirer");

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

// ************
// PROMPTS HERE
// ************

// WHAT DID THE USE CHOOSE TO DO? READY!
const newAction = () => {
  whatAction().then(function (action) {
    switch (action) {
      case "View all departments":
        viewAllDepartmentsQuery();
        break;
      case "View all roles":
        viewAllRolesQuery();
        break;
      case "View all employees":
        viewAllEmployeesQuery();
        break;
      case "Add department":
        addDepartmentPrompt();
        break;
      case "Add role":
        addRolePrompt();
        break;
      case "Add employee":
        addEmployeePrompt();
        break;
      case "Update an employee role":
        updateEmployeeRolePrompt();
        break;
      default:
        console.log("sorry, there was an error, no valid choice selected.");
    }
  });
};

// Prompt, what would you like to do: PROMPT READY
// What did the user choose to do: FUNCTION READY
// View all departments: PROMPT READY
// View all roles
// View all employees
// Add department
// Add role
// Add employee
// Update an employee role

// WHAT DO YOU WANT TO DO PROMPT: READY!
const whatAction = () => {
  return inquirer.prompt([
    {
      type: "list",
      message: "What action would you like to take?",
      name: "action",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update an employee role",
      ],
    },
  ]);
};

// ADD DEPARTMENT PROMPT: READY!
const addDepartmentPrompt = () => {
  return inquirer.prompt([
    {
      type: "value",
      message: "Enter the department name:",
      name: "name",
    },
  ]);
};

// ADD ROLE PROMPT: READY!
const addRolePrompt = () => {
  const deptList = listAllDepartments();
  return inquirer
    .prompt([
      {
        type: "value",
        message: "Enter the role title name:",
        name: "role",
      },
      {
        type: "value",
        message: "Enter the salary for this role:",
        name: "salary",
      },
      {
        type: "list",
        message: "Select the department:",
        name: "department",
        choices: deptList,
      },
    ])
    .then(function (data) {
      addRole(data);
    });
};

// ADD ROLE EMPLOYEE: IN-PROGRESS!
const addEmployeePrompt = () => {
  const roleList = listAllRoles();
  return inquirer.prompt([
    {
      type: "value",
      message: "Employee first name:",
      name: "firstname",
    },
    {
      type: "value",
      message: "Employee last name:",
      name: "lastname",
    },
    {
      type: "list",
      message: "Select employee role:",
      name: "role",
      choices: roleList,
    },
  ]);
};

// UPDATE EMPLOYEE: IN-PROGRESS!
const updateEmployeeRolePrompt = () => {
  return inquirer.prompt([{}]);
};

// ************
// QUERIES HERE
// ************

// VIEW ALL DEPARTMENTS: IN-PROGRESS!
const viewAllDepartmentsQuery = () => {};

// VIEW ALL ROLES: IN-PROGRESS!
const viewAllRolesQuery = () => {};

// VIEW ALL EMPLOYEES: IN-PROGRESS!
const viewAllEmployeesQuery = () => {};

// Example calls
app.get("/db", (req, res) => {
  db.query(`SELECT FROM movies_names WHERE id = ?`, 1, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

// ************
// EXAMPLES
// ************

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
