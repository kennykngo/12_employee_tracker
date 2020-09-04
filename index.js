const inquirer = require("inquirer");
const mysql = require("mysql");
const dotenv = require("dotenv");
require("console.table");
// const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASS,
  database: "employees_db",
  port: 3306,
});

connection.connect((err) => {
  err ? console.log("error connecting to db", err) : promptDisplay();
});

const promptDisplay = () => {
  inquirer
    .prompt([
      {
        type: "list",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update Employee Role",
          "Delete Employee",
          "Delete Role",
          "Delete Department",
          "Exit",
        ],
        name: "navigation",
        message: "What would you like to do?",
      },
    ])
    .then((userChoice) => {
      switch (userChoice.navigation) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        default:
          connection.end();
          process.exit(1);
      }
    });
};

const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, data) => {
    console.table(data);
    promptDisplay();
  });
};

const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, data) => {
    console.table(data);
    promptDisplay();
  });
};
const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, data) => {
    console.table(data);
    promptDisplay();
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter employee first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter employee last name",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter employee role ID",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter employee manager ID",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
        [res.first_name, res.last_name, res.role_id, res.manager_id],
        (err, data) => {
          if (err) {
            throw err;
          } else {
            console.log("Employee Added");
            promptDisplay();
          }
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter role title",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter role salary",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter role department ID",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
        [res.title, res.salary, res.department_id],
        (err, data) => {
          if (err) {
            throw err;
          } else {
            console.log("Role Added");
            promptDisplay();
          }
        }
      );
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter department name",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [res.name],
        (err, data) => {
          if (err) {
            throw err;
          } else {
            console.log("Department Added");
            promptDisplay();
          }
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "Enter Employee ID",
      },
      {
        type: "input",
        name: "new_role_id",
        message: "Enter New Role ID",
      },
    ])
    .then((res) => {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [res.new_role_id, res.employee_id],
        (err, data) => {
          if (err) {
            throw err;
          } else {
            console.log("Employee Role Updated");
            promptDisplay();
          }
        }
      );
    });
};

const deleteDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_id",
        message: "Enter Department ID to be Deleted",
      },
    ])
    .then((res) => {
      connection.query(
        "DELETE FROM department WHERE id = ?",
        res.department_id,
        (err, data) => {
          if (err) {
            throw err;
          } else {
            console.log("Department Deleted");
            promptDisplay();
          }
        }
      );
    });
};

const deleteEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "Enter Employee ID to be Deleted",
      },
    ])
    .then((res) => {
      connection.query(
        "DELETE FROM employee WHERE id = ?",
        res.employee_id,
        (err, data) => {
          if (err) {
            throw err;
          } else {
            console.log("Employee Deleted");
            promptDisplay();
          }
        }
      );
    });
};

const deleteRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_id",
        message: "Enter Role ID to be Deleted",
      },
    ])
    .then((res) => {
      connection.query(
        "DELETE FROM role WHERE id = ?",
        res.role_id,
        (err, data) => {
          if (err) {
            throw err;
          } else {
            console.log("Employee Deleted");
            promptDisplay();
          }
        }
      );
    });
};
