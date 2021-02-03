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

  function getAction(){
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["View Information", "Add New Information", "Exit"]
        }
    ]).then(data => {
        if(data.action === "View Information"){
            viewData();
        }else if (data.action ==="Add New Information"){
            addData();
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

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    getAction();
  });