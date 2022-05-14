const mysql = require("mysql2");
const consoleTable = require("console.table");
// const { newAction } = require("../server");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "XC04stareld57*",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database from the dbUtils file.`)
);

// ************
// VIEW ALL OF SOMETHING HELPER FUNCTIONS
// ************

// UTIL HELPER FUNCTION: READY!
const viewAllDepartments = () => {
  db.query("SELECT department.name FROM department", function (err, res) {
    if (err) throw "viewAllDepartments helper function error";
    console.table(res);
  });
};

// UTIL HELPER FUNCTION: READY!
const viewAllRoles = () => {
  db.query(
    "SELECT role.title FROM role LEFT JOIN department ON role.department_id = department.id",
    function (err, res) {
      if (err) throw "viewAllRoles helper function error";
      console.table(res);
    }
  );
};

// UTIL HELPER FUNCTION: READY!
const viewAllEmployees = () => {
  db.query(
    "SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee GROUP BY department_id",
    function (err, res) {
      if (err) throw "viewAllEmployees helper function error";
      console.table(res);
    }
  );
};

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
      if (err) throw "addDepartment helper function error";
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
      if (err) throw "addRole helper function error";
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
      if (err) throw "addEmployee helper function error";
      console.log(res);
    }
  );
};

// ************
// UPDATE SOMETHING HELPER FUNCTIONS
// ************

// UTIL UPDATE EMPLOYEE HELPER FUNCTION: IN-PROGRESS!
const updateEmployeeRole = (data) => {
  console.log(data);
  let roleString = data.role;
  let employee_id = roleString.slice(0, 2);
  db.query(
    "UPDATE employee SET role_id = ? WHERE employee.id = ?",
    data.role,
    employee_id,
    function (err, res) {
      if (err) throw "updateEmployeeRole helper function error";
      console.log(res);
    }
  );
};

// ************
// PROVIDE LIST FOR PROMPT CHOICES HELPER FUNCTIONS
// ************

// UTIL LIST ALL DEPARTMENTS HELPER FUNCTION: READY!
const listAllDepartments = () => {
  db.query("SELECT department.name FROM department", function (err, res) {
    if (err) throw "listAllDepartments helper function error";
    let deptList = [];
    res.forEach((item) => {
      deptList.push(item.name);
    });
  });
};

// UTIL LIST ALL ROLES HELPER FUNCTION: READY!
const listAllRoles = () => {
  db.query("SELECT role.title FROM role", function (err, res) {
    if (err) throw "listAllRoles helper function error";
    let roleList = [];
    res.forEach((item) => {
      roleList.push(item.title);
    });
  });
};

// UTIL LIST ALL EMPLOYEES HELPER FUNCTION: READY!
const listAllEmployees = () => {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name FROM employee",
    function (err, res) {
      if (err) throw "listAllEmployees helper function error";
      let employeeList = [];
      res.forEach((item) => {
        let employeeIdentity = `${item.id} ${item.first_name} ${item.last_name}`;
        employeeList.push(employeeIdentity);
      });
    }
  );
};

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
