const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");
const ctable = require("console.table")
const promisemysql = require("promise-mysql");
const fs = require('fs');

const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "sam",
    password: "Dubhghall1!",
    database: "company_db"
}
const app = express();

const connection = mysql.createConnection(connectionProperties);

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("\n Welcome to Employee Manager");
    getAction();
  });

  // helper function to list Job Roles 
  
function getRoles() {
   let roleArr = [];
    connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  })
  return roleArr;
}

// Helper function to list Managers
var managersArr = [];
function getManagers() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}
// Main Action menu, leads to various submenus
  function getAction(){
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["View Information", "Add New Information", "Update Existing Information","Exit"]
        }
    ]).then(data => {
        if(data.action === "View Information"){
            viewData();
        }else if (data.action ==="Add New Information"){
            addData();
        }else if (data.action ==="Update Existing Information"){
            changeData();  
        }else if (data.action ==="Exit"){
           connection.end(); 
       
        }else {
            start();
        };
    });
}
// Submenu for choosing which Data to look at.
 function viewData() {
     inquirer.prompt([
         {
             type: "list",
             name: "view",
             message: "Please select an option to view:",
             choices:["All Employees", "Employees by Department", "All Job Roles", "Employees By Job Role", "Go Back"]
         }   
     ]).then (answer => {
        switch (answer.view) {
            case "Employees by Department":
                displayDepts();
                break;
            case "All Job Roles":
                displayRoles();
                break;
            case "All Employees":
                displayEmployees();
                break;
            case "Employees By Job Role":
                 displayEmpByRole();
                break;
            case "Go Back":
                getAction();
                break;
             default :
                viewData();
                break;
        }
     })
 }

// View all Employee information
 function displayEmployees() {
    let query = fs.readFileSync("./sql/allEmployeesData.sql", "utf8");
    connection.query(query, (err,res) => {
        if (err) throw err;
        console.table(res);
        getAction();
    });
}

// View Employees by Department
function displayDepts() {
    let deptArray = [];
    promisemysql.createConnection(connectionProperties)
    .then((connection)=>{
        return connection.query ('SELECT name FROM department');
    }).then (data => {
        for (i = 0; i <data.length; i++){
            deptArray.push(data[i].name);
        }
    }).then (() => {
         // Prompt user to select department from array of departments
         inquirer.prompt({
            name: "department",
            type: "rawlist",
            message: "Which department would you like to search?",
            choices: deptArray
        })    
        .then((answer) => {

            // Query all employees depending on selected department
            let query = fs.readFileSync("sql/employeesByDept.sql", "utf8");
            connection.query(query,[`${answer.department}`], (err, res) => {
                if(err) return err;
                
                console.log("\n");
                console.table(res);
                getAction();
            });
        });       
    });
}
function displayRoles() {
    let query = fs.readFileSync("sql/allJobRoles.sql", "utf8");
    connection.query(query, (err,res) => {
        if (err) throw err;
        console.table(res);
        getAction();
    });
}
// View Employees in a specific role
function displayEmpByRole() {
    let roleArray = [];
    promisemysql.createConnection(connectionProperties)
    .then((connection)=>{
        return connection.query ('SELECT title FROM role');
    }).then (data => {
        for (i = 0; i <data.length; i++){
            roleArray.push(data[i].title);
        }
        console.log(roleArray)
    }).then (() => {
         // Prompt user to select department from array of departments
         inquirer.prompt({
            name: "title",
            type: "rawlist",
            message: "Which job would you like to search?",
            choices: roleArray
        })    
        .then((answer) => {

            // Query all employees depending on selected department
            let query = fs.readFileSync("sql/employeesByRole.sql", "utf8");
            connection.query(query,[`${answer.title}`], (err, res) => {
                if(err) return err;
                
                console.log("\n");
                console.table(res);
                getAction();
            });
        });       
    });
}

function addData(){
        inquirer.prompt([
            {
                type: "list",
                name: "add",
                message: "Please select what you would like to add:",
                choices:["Department", "Job Role", "Employee", "Go Back"]
            }   
        ]).then (answer => {
           switch (answer.add) {
               case "Department":
                   addDept();
                   break;
               case "Job Role":
                   addRole();
                   break;
               case "Employee":
                   addEmployee();
                   break;
               case "Go Back":
                    getAction();
                    break;
               default :
                   addData();
                   break;
           }
        })
 }

function addDept(){
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the department you would like to add?"
        },
        {
            type: "input",
            name: "deptCode",
            message: "What is the ID for your new department?"
        }
    ]).then(answer => {
        let deptName = answer.deptName.trim().toLowerCase();
        let deptCode = answer.deptCode.trim().toUpperCase();
        let query = fs.readFileSync("./sql/add.sql", "utf8");
        connection.query(query, [ `department (id, name)`,`("${deptCode}","${deptName}")`, "department"],
            (err,res) => {
            if (err) throw err;
            console.log("That department has been added!")
            displayDepts()
        });
    })
}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title for the role you want to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the base salary for your new role?"
        },
        {
            type: 'input',
            name: "deptCode",
            message: "What department is this role in? Please enter the dept ID."
        }
    ]).then(answer => {
        let title = answer.title.trim();
        let deptCode = answer.deptCode.trim().toUpperCase();
        let salary = Number(answer.salary);
        let query = `INSERT into role (title,salary,department_id) values ('${title}',${salary},'${deptCode}')`;
        connection.query(query, (err,res) => {
            if (err) throw err;
            console.log("That job has been added!");
            displayRoles();
        });
    })
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Please enter the new employee's first name."
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter the new employee's last name."
        },
        {
            type: 'input',
            name: "roleID",
            message: "Please enter the role ID code for this new employee."
        },
    ]).then(answer => {
        let firstName = answer.firstName.trim();
        let lastName = answer.lastName.trim();
        let roleID =parseInt(answer.roleID);
        let query = `INSERT into employee (first_name,last_name,role_id) values ('${firstName}','${lastName}',${roleID})`;
        connection.query(query, (err,res) => {
            if (err) throw err;
            console.log("That employee has been added!");
            displayEmployees();  
        });
    })
}

function changeData() {
    
    inquirer.prompt([
        {
            type: "list",
            name: "change",
            message: "Please select what you would like to change:",
            choices:["Job Role", "Employee", "Go Back"]
        }   
    ]).then (answer => {
       switch (answer.change) {
           
           case "Job Role":
               changeRoles();
               break;
           case "Employee":
               changeEmployee();
               break;
           case "Go Back":
               getAction();
               break;
            default :
               changeData();
               break;
       }
    })
}

function changeRoles() {
    roleArr = getRoles();
    console.log(roleArr);
    inquirer.prompt([
        {
            type: "rawlist",
            name: "title",
            message: "Which job role do you want to change?",
            choices: roleArr
        },       
        {
            type: "list",
            name: "roleChange",
            message: "Please select what you would like to change:",
            choices:["Job Title", "Salary", "Department", "Go Back"]
        }   
    ]).then (answer => {
       switch (answer.roleChange) {
           
           case "Job Title":
               updateTitle(answer.title);
               break;
           case "Salary":
               updateSalary(answer.title);
               break;
            case "Department":
                updateDept(answer.title);
                break;    
           case "Go Back":
               changeData(answer.title);
               break;
            default :
               changeRoles(answer.title);
               break;
       }
    })
}
function updateTitle(title){
    inquirer.prompt([
        {
            type: "input",
            name: "newTitle",
            message: "What should the new job title be?"
        }
    ]).then( answer => {
        query = "UPDATE role Set ? where ?";
        connection.query(query, [{
            title: answer.newTitle
        },
        {
            title: title
        }],
            (err,res) => {
            if (err) throw err;
            console.log("That job title has been changed.")

    })
})};