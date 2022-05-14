const inquirer = require("inquirer");
const mysql = require("mysql2");

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

const consoleTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "XC04stareld57*",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database from the server file.`)
);

db.connect(function () {
  newAction();
});

// ************
// PROMPTS HERE
// ************

// WHAT DID THE USER CHOOSE TO DO? READY!
const newAction = () => {
  whatAction().then(function (choice) {
    console.log(choice.choice);
    switch (choice.choice) {
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
      case "Exit application":
        exitApplication();
        console.log("Exiting the application");
        return;
      default:
        console.log("sorry, there was an error, no valid choice selected.");
    }
  });
};

// WHAT DO YOU WANT TO DO PROMPT: READY!
const whatAction = () => {
  return inquirer.prompt([
    {
      type: "list",
      message: "What action would you like to take?",
      name: "choice",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update an employee role",
        "Exit application",
      ],
    },
  ]);
};

// newAction();

// ADD DEPARTMENT PROMPT: READY!
// UTIL HELPER FUNCTION: READY!
const addDepartmentPrompt = () => {
  return inquirer
    .prompt([
      {
        type: "value",
        message: "Enter the department name:",
        name: "name",
      },
    ])
    .then(function (data) {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        data.name,
        function (err, res) {
          if (err) throw "addDepartment helper function error";
          console.log(res);
          newAction();
        }
      );

      // addDepartment(data);
      // newAction();
    });
};

// // ADD ROLE PROMPT: READY!
// // UTIL HELPER FUNCTION: READY!
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
      // newAction();
    });
};

// // ADD ROLE EMPLOYEE: READY!
// // UTIL HELPER FUNCTION: READY!
const addEmployeePrompt = () => {
  const roleList = listAllRoles();
  return inquirer
    .prompt([
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
    ])
    .then(function (data) {
      addEmployee(data);
      // newAction();
    });
};

// // UPDATE EMPLOYEE ROLE: READY!
// // UTIL HELPER FUNCTION: READY!
const updateEmployeeRolePrompt = () => {
  const employeeList = listAllEmployees();
  const roleList = listAllRoles();
  return inquirer
    .prompt([
      {
        type: "list",
        message: "Select employee:",
        name: "employee_id_name",
        choices: employeeList,
      },
      {
        type: "list",
        message: "Select the employee role:",
        name: "role",
        choices: roleList,
      },
    ])
    .then(function (data) {
      updateEmployee(data);
      // newAction();
    });
};

// // ************
// // QUERIES HERE
// // ************

// // VIEW ALL DEPARTMENTS: READY!
// // UTIL HELPER FUNCTION: READY!
const viewAllDepartmentsQuery = () => {
  db.query(
    "SELECT department.name AS Department FROM department",
    function (err, res) {
      if (err) throw "viewAllDepartments helper function error";
      console.table(res);
      newAction();
    }
  );
  // const allDeptsList = parse.viewAllDepartments();
  // console.table(allDeptsList);
};

// VIEW ALL ROLES: READY!
// UTIL HELPER FUNCTION: READY!
const viewAllRolesQuery = () => {
  db.query(
    "SELECT role.title AS Role, role.salary AS Salary, department.name AS Dept FROM role LEFT JOIN department ON role.department_id = department.id",
    function (err, res) {
      if (err) throw "viewAllRoles helper function error";
      console.table(res);
      newAction();
    }
  );
  // const allRolesList = viewAllRoles();
  // console.table(allRolesList);
};

// VIEW ALL EMPLOYEES: READY!
// UTIL HELPER FUNCTION: READY!
const viewAllEmployeesQuery = () => {
  // db.query(
  //   "SELECT employee.id AS ID, employee.first_name AS First, employee.last_name AS Last, AS ManagerID, role.title AS Title,  department.name AS Dept, role.salary AS Salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
  //   function (err, res) {
  //     if (err) throw "viewAllEmployees helper function error";
  //     console.table(res);
  //     newAction();
  //   }
  // );
  db.query(
    "SELECT first_employee.first_name, first_employee.last_name, second_employee.first_name AS manager_first_name, second_employee.last_name AS manager_last_name" +
      " FROM employee as first_employee" +
      " LEFT JOIN employee as second_employee" +
      " ON first_employee.manager_id = second_employee.id" +
      " WHERE first_employee.manager_id = second_employee.id OR first_employee.manager_id IS null;",
    function (err, res) {
      if (err) throw "viewAllEmployees helper function error";
      console.table(res);
      newAction();
    }
  );

  // const allEmployeesList = viewAllEmployees();
  // console.table(allEmployeesList);
};

const exitApplication = () => db.end();

// module.exports = { newAction };

// INCLUDE THE FOLLOWING OPERATIONS
// Prompt, what would you like to do: PROMPT READY!
// What did the user choose to do: FUNCTION READY!
// View all departments: FUNCTION READY!
// View all roles: FUNCTION READY!
// View all employees: FUNCTION READY!
// Add department: PROMPT READY!
// Add role: PROMPT READY!
// Add employee: PROMPT READY!
// Update an employee role: PROMPT READY!

// (BONUS OPERATIONS)
// Veiw employees by manager (BONUS)
// View employees by department (BONUS)
// View sum of salaries by department (BONUS)
// Update employee managers (BONUS)
// Delete department (BONUS)
// Delete role (BONUS)
// Delete employee (BONUS)

// ************
// EXAMPLES
// ************

// Example calls
// app.get("/db", (req, res) => {
//   db.query(`SELECT FROM movies_names WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });
// });

// SUM the, plus multiple stats on
// db.query(
//   "SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section",
//   function (err, results) {
//     console.log(results);
//   }
// );

// // Select all and show how many are in stock true / false.
// db.query(
//   "SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock",
//   function (err, results) {
//     console.log(results);
//   }
// );

// // Query database
// db.query("SELECT * FROM course_names", function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// // Hardcoded query: DELETE FROM course_names WHERE id = 3;
// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
