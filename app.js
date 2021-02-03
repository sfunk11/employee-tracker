const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");
const fs = require('fs')

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
    connection.end();
  });