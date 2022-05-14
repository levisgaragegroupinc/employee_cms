const inquirer = require("inquirer");
const mysql = require("mysql2");
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

// WHAT DID THE USER CHOOSE TO DO? READY! TESTED!
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

// WHAT DO YOU WANT TO DO PROMPT: READY! TESTED!
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

// ADD DEPARTMENT PROMPT: READY! TESTED!
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
          if (err) throw "addDepartment function error";
          console.log(res);
          newAction();
        }
      );
    });
};

// ADD ROLE PROMPT: READY! TESTED!
const addRolePrompt = () => {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw "listAllDepartments function error";

    let deptNameArray = [];
    for (let i = 0; i < res.length; i++) {
      deptNameArray.push(res[i].name);
    }

    let deptIDArray = [];
    for (let i = 0; i < res.length; i++) {
      deptIDArray.push(res[i].id);
    }

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
          choices: deptNameArray,
        },
      ])
      .then(function (data) {
        let departmentId;
        for (let i = 0; i < res.length; i++) {
          if (res[i].name == data.department) {
            departmentId = res[i].id;
          }
        }
        db.query(
          "INSERT INTO role SET ?",
          {
            title: data.role,
            salary: data.salary,
            department_id: departmentId,
          },
          function (err, res) {
            if (err) throw "addRole function error";
            console.log(res);
            newAction();
          }
        );
      });
  });
};

// ADD EMPLOYEE: READY!
const addEmployeePrompt = () => {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw "AddEmployee function error";
    let employeeNameArray = getEmployeeNames();
    console.log(employeeNameArray);

    let rolesNameArray = [];
    for (let i = 0; i < res.length; i++) {
      rolesNameArray.push(res[i].title);
    }

    let rolesIDArray = [];
    for (let i = 0; i < res.length; i++) {
      rolesIDArray.push(res[i].id);
    }

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
          choices: rolesNameArray,
        },
        {
          type: "list",
          message: "Select employee manager:",
          name: "manager",
          choices: employeeNameArray,
        },
      ])
      .then(function (data) {
        let roleId;
        for (let i = 0; i < res.length; i++) {
          if (res[i].title == data.role) {
            roleId = res[i].id;
          }
        }
        let managerId;
        for (let i = 0; i < employeeIDArray.length; i++) {
          if (employeeNameArray[i] == data.manager) {
            managerId = employeeIDArray[i];
          }
        }
        db.query(
          "INSERT INTO employee SET ?",
          {
            first_name: data.firstname,
            last_name: data.lastname,
            role_id: roleId,
            manager_id: managerId,
          },
          function (err, res) {
            if (err) throw "addEmployee function error";
            console.log(res);
            newAction();
          }
        );
      });
  });
};

// Get department IDs
// const getDepartmentIDs = () => {
//   db.query("SELECT * FROM department", function (err, res) {
//     if (err) throw "getAllDepartmentIDs function error";
//     let deptIDArray = [];
//     for (let i = 0; i < res.length; i++) {
//       deptIDArray.push(res[i].id);
//     }
//     return deptIDArray;
//   });
// };

// // Get department Names
// const getDepartmentNames = () => {
//   db.query("SELECT * FROM department", function (err, res) {
//     if (err) throw "getAllDepartmentNames function error";
//     let deptNameArray = [];
//     for (let i = 0; i < res.length; i++) {
//       deptNameArray.push(res[i].name);
//     }
//     return deptNameArray;
//   });
// };

// Get employee Names
// const getEmployeeNames = () => {
//   db.query("SELECT * FROM employee", function (err, res) {
//     if (err) throw "getEmployeeNames function error";
//     let employeeNameArray = [];
//     for (let i = 0; i < res.length; i++) {
//       employeeNameArray.push(res[i].name);
//     }
//     return employeeNameArray;
//   });
// };

// const getEmployeeIDs = () => {
//   db.query("SELECT * FROM employee", function (err, res) {
//     if (err) throw "getEmployeeIDs function error";
//     let employeeIDArray = [];
//     for (let i = 0; i < res.length; i++) {
//       employeeIDArray.push(res[i].name);
//     }
//     console.log(employeeIDarray);
//     return employeeIDarray;
//   });
// };

// getEmployeeIDs();
// getEmployeeNames();

// UPDATE EMPLOYEE ROLE: READY!
// UTIL HELPER FUNCTION: READY!
const updateEmployeeRolePrompt = () => {
  // const employeeList = listAllEmployees();
  // const roleList = listAllRoles();
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

// ************
// QUERIES HERE
// ************

// VIEW ALL DEPARTMENTS: READY! TESTED!
const viewAllDepartmentsQuery = () => {
  db.query(
    "SELECT department.name AS Department FROM department",
    function (err, res) {
      if (err) throw "viewAllDepartments helper function error";
      console.table(res);
      newAction();
    }
  );
};

// VIEW ALL ROLES: READY! TESTED!
const viewAllRolesQuery = () => {
  db.query(
    "SELECT role.title AS Role, role.salary AS Salary, department.name AS Dept FROM role LEFT JOIN department ON role.department_id = department.id",
    function (err, res) {
      if (err) throw "viewAllRoles helper function error";
      console.table(res);
      newAction();
    }
  );
};

// VIEW ALL EMPLOYEES: READY! TESTED!
const viewAllEmployeesQuery = () => {
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
};

const exitApplication = () => db.end();

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
