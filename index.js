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

// async function viewEmployees() {
//   const employees = await db.findAllEmployees();

//   console.log("\n");
//   console.table(employees);

//   loadMainPrompts();
// }

// async function viewEmployeesByDepartment() {
//   const departments = await db.findAllDepartments();

//   const departmentChoices = departments.map(({ id, name }) => ({
//     name: name,
//     value: id,
//   }));

//   const { departmentId } = await prompt([
//     {
//       type: "list",
//       name: "departmentId",
//       message: "Which department would you like to see employees for?",
//       choices: departmentChoices,
//     },
//   ]);

//   const employees = await db.findAllEmployeesByDepartment(departmentId);

//   console.log("\n");
//   console.table(employees);

//   loadMainPrompts();
// }

// async function viewEmployeesByManager() {
//   const managers = await db.findAllEmployees();

//   const managerChoices = managers.map(({ id, first_name, last_name }) => ({
//     name: `${first_name} ${last_name}`,
//     value: id,
//   }));

//   const { managerId } = await prompt([
//     {
//       type: "list",
//       name: "managerId",
//       message: "Which employee do you want to see direct reports for?",
//       choices: managerChoices,
//     },
//   ]);

//   const employees = await db.findAllEmployeesByManager(managerId);

//   console.log("\n");

//   if (employees.length === 0) {
//     console.log("The selected employee has no direct reports");
//   } else {
//     console.table(employees);
//   }

//   loadMainPrompts();
// }

// async function removeEmployee() {
//   const employees = await db.findAllEmployees();

//   const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
//     name: `${first_name} ${last_name}`,
//     value: id,
//   }));

//   const { employeeId } = await prompt([
//     {
//       type: "list",
//       name: "employeeId",
//       message: "Which employee do you want to remove?",
//       choices: employeeChoices,
//     },
//   ]);

//   await db.removeEmployee(employeeId);

//   console.log("Removed employee from the database");

//   loadMainPrompts();
// }

// async function updateEmployeeRole() {
//   const employees = await db.findAllEmployees();

//   const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
//     name: `${first_name} ${last_name}`,
//     value: id,
//   }));

//   const { employeeId } = await prompt([
//     {
//       type: "list",
//       name: "employeeId",
//       message: "Which employee's role do you want to update?",
//       choices: employeeChoices,
//     },
//   ]);

//   const roles = await db.findAllRoles();

//   const roleChoices = roles.map(({ id, title }) => ({
//     name: title,
//     value: id,
//   }));

//   const { roleId } = await prompt([
//     {
//       type: "list",
//       name: "roleId",
//       message: "Which role do you want to assign the selected employee?",
//       choices: roleChoices,
//     },
//   ]);

//   await db.updateEmployeeRole(employeeId, roleId);

//   console.log("Updated employee's role");

//   loadMainPrompts();
// }

// async function updateEmployeeManager() {
//   const employees = await db.findAllEmployees();

//   const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
//     name: `${first_name} ${last_name}`,
//     value: id,
//   }));

//   const { employeeId } = await prompt([
//     {
//       type: "list",
//       name: "employeeId",
//       message: "Which employee's manager do you want to update?",
//       choices: employeeChoices,
//     },
//   ]);

//   const managers = await db.findAllPossibleManagers(employeeId);

//   const managerChoices = managers.map(({ id, first_name, last_name }) => ({
//     name: `${first_name} ${last_name}`,
//     value: id,
//   }));

//   const { managerId } = await prompt([
//     {
//       type: "list",
//       name: "managerId",
//       message:
//         "Which employee do you want to set as manager for the selected employee?",
//       choices: managerChoices,
//     },
//   ]);

//   await db.updateEmployeeManager(employeeId, managerId);

//   console.log("Updated employee's manager");

//   loadMainPrompts();
// }

// async function viewRoles() {
//   const roles = await db.findAllRoles();

//   console.log("\n");
//   console.table(roles);

//   loadMainPrompts();
// }

// async function addRole() {
//   const departments = await db.findAllDepartments();

//   const departmentChoices = departments.map(({ id, name }) => ({
//     name: name,
//     value: id,
//   }));

//   const role = await prompt([
//     {
//       name: "title",
//       message: "What is the name of the role?",
//     },
//     {
//       name: "salary",
//       message: "What is the salary of the role?",
//     },
//     {
//       type: "list",
//       name: "department_id",
//       message: "Which department does the role belong to?",
//       choices: departmentChoices,
//     },
//   ]);

//   await db.createRole(role);

//   console.log(`Added ${role.title} to the database`);

//   loadMainPrompts();
// }

// async function removeRole() {
//   const roles = await db.findAllRoles();

//   const roleChoices = roles.map(({ id, title }) => ({
//     name: title,
//     value: id,
//   }));

//   const { roleId } = await prompt([
//     {
//       type: "list",
//       name: "roleId",
//       message:
//         "Which role do you want to remove? (Warning: This will also remove employees)",
//       choices: roleChoices,
//     },
//   ]);

//   await db.removeRole(roleId);

//   console.log("Removed role from the database");

//   loadMainPrompts();
// }

// async function viewDepartments() {
//   const departments = await db.findAllDepartments();

//   console.log("\n");
//   console.table(departments);

//   loadMainPrompts();
// }

// async function addDepartment() {
//   const department = await prompt([
//     {
//       name: "name",
//       message: "What is the name of the department?",
//     },
//   ]);

//   await db.createDepartment(department);

//   console.log(`Added ${department.name} to the database`);

//   loadMainPrompts();
// }

// async function removeDepartment() {
//   const departments = await db.findAllDepartments();

//   const departmentChoices = departments.map(({ id, name }) => ({
//     name: name,
//     value: id,
//   }));

//   const { departmentId } = await prompt({
//     type: "list",
//     name: "departmentId",
//     message:
//       "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
//     choices: departmentChoices,
//   });

//   await db.removeDepartment(departmentId);

//   console.log(`Removed department from the database`);

//   loadMainPrompts();
// }

// async function addEmployee() {
//   const roles = await db.findAllRoles();
//   const employees = await db.findAllEmployees();

//   const employee = await prompt([
//     {
//       name: "first_name",
//       message: "What is the employee's first name?",
//     },
//     {
//       name: "last_name",
//       message: "What is the employee's last name?",
//     },
//   ]);

//   const roleChoices = roles.map(({ id, title }) => ({
//     name: title,
//     value: id,
//   }));

//   const { roleId } = await prompt({
//     type: "list",
//     name: "roleId",
//     message: "What is the employee's role?",
//     choices: roleChoices,
//   });

//   employee.role_id = roleId;

//   const managerChoices = employees.map(({ id, first_name, last_name }) => ({
//     name: `${first_name} ${last_name}`,
//     value: id,
//   }));
//   managerChoices.unshift({ name: "None", value: null });

//   const { managerId } = await prompt({
//     type: "list",
//     name: "managerId",
//     message: "Who is the employee's manager?",
//     choices: managerChoices,
//   });

//   employee.manager_id = managerId;

//   await db.createEmployee(employee);

//   console.log(
//     `Added ${employee.first_name} ${employee.last_name} to the database`
//   );

//   loadMainPrompts();
// }

// function quit() {
//   console.log("Goodbye!");
//   process.exit();
// }
