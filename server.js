const inquirer = require("inquirer")
var mysql = require("mysql");
var express = require("express");
var app = express();

//handles data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "company_DB"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Serve index.handlebars to the root route, populated with all quote data.

function comp() {
    inquirer
        .prompt([{
            type: 'list',
            message: 'what would you like to do?',
            name: 'main',
            choices: ['View departments,roles, employees',
                'add departments', 'add roles', 'add employees',
                'Update employee roles'
            ]

        },
        {
            type: 'input',
            message: 'Add Department',
            name: 'addDepartment',
            when: function (answers) {
                return answers.main === "add departments";
            }
            
        },
        {
            type: 'input',
            message: 'Add Role',
            name: 'addRole',
            when: function (answers) {
                return answers.main === "add roles";
            }
            
        },
        {
            type: 'input',
            message: 'Add Employee',
            name: 'addEmployee',
            when: function (answers) {
                return answers.main === "add employees";
            }
            
        },
        {
            type: 'input',
            message: 'Update employee Role',
            name: 'updateRole',
            when: function (answers) {
                return answers.main === "Update employee roles";
            }
            
        },
        
        

        ])

        .then(data => {
           
            switch (data.main) {
                case "View departments,roles, employees":
                    
                        connection.query("SELECT * FROM department ;", function(err, data) {
                          if (err) {
                            throw(err)
                          }
                      
                          return ({company_db : data });
                        });
                      
                    break;

                case "add departments":
                    connection.query("INSERT INTO department (name) VALUES (?)", function(err, data) {
                        if (err) {
                          throw err;
                        }
                        return ({compnany_db: department})
                    
                        
                      });
               


            }
           

        })





}
comp()
