const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");
const ctable = require("console.table")

const fs = require('fs');
const { start } = require("repl");

const app = express();

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "sam",
  
    // Your password
    password: "Dubhghall1!",
    database: "company_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    getAction();
  });

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
 function viewData() {
     inquirer.prompt([
         {
             type: "list",
             name: "view",
             message: "Please select what you would like to view:",
             choices:["Departments", "Job Roles", "Employees", "Hit me with Everything"]
         }   
     ]).then (answer => {
        switch (answer.view) {
            case "Departments":
                displayDepts();
            case "Job Roles":
                displayRoles();
            case "Employees":
                displayEmployees();
            case "Hit me with Everything":
                displayAll();
            case "Go Back":
                getAction();
             default :
                viewData();
        }
     })
 }

function displayDepts() {
    let query = "SELECT * FROM department";
    connection.query(query, (err,res) => {
        if (err) throw err;
        console.table(res);
        getAction();
    });
}
function displayRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, (err,res) => {
        if (err) throw err;
        console.table(res);
        getAction();
    });
}
function displayEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, (err,res) => {
        if (err) throw err;
        console.table(res);
        getAction();
    });
}
function displayAll(){
    let query = "SELECT * FROM department";
    connection.query(query, (err,res) => {
        if (err) throw err;
        console.table(res);
         let query = "SELECT * FROM role";
        connection.query(query, (err,res) => {
            if (err) throw err;
            console.table(res);
            let query = "SELECT * FROM employee";
            connection.query(query, (err,res) => {
                if (err) throw err;
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
               case "Job Role":
                   addRole();
               case "Employee":
                   addEmployee();
               case "Go Back":
                    getAction();
               default :
                   addData();
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
        let query = `INSERT into department (id, name) values ('${deptCode}','${deptName}')`;
        connection.query(query, (err,res) => {
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
