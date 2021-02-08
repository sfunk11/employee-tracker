// View all Employee information
const fs = require("fs");


exports.displayEmployees = (connection) => {
    let query = fs.readFileSync("./sql/allEmployeesData.sql", "utf8");
    connection.query(query, (err,res) => {
        if (err) throw err;
        return (res);
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
