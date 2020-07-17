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
    comp()
    console.log("connected as id " + connection.threadId);
});



function comp() {
    inquirer
        .prompt([{
            type: 'list',
            message: 'what would you like to do?',
            name: 'main',
            choices: ['View department', 'View roles', 'view employees',
                'add departments', 'add roles', 'add employees',
                'Update employee roles', 'Exit'
            ]

        },
        ])

        .then(data => {
            console.log(data)

            switch (data.main) {
                case "View department":

                    connection.query("SELECT * FROM department", function (err, data) {

                        if (err) {
                            throw (err)
                        }
                        console.table(data)
                        comp()
                    });

                    break;

                case "add departments":
                    addDep()

                    break;
                case "add employees":
                    addEmp()

                    break;
                case "view employees":
                    viewEmp()
                    break;
                case "View roles":
                    viewRole()
                    break;
                case "add roles":
                    addRole()
                    break;
                case "Update employee roles":
                    updateRole()
                    break;
                case "Exit":
                    connection.end()
                    break;




            }


        })





}


function addEmp() {
    inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: " first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: " last name?"

    },
    {
        type: "input",
        name: "roleID",
        message: " Role ID?"

    },
    {
        type: "input",
        name: "mgrID",
        message: " Manager ID?"

    },


    ]).then(function (answer) {
        connection.query("INSERT INTO employees SET? ", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleID,
            manager_id: answer.mgrID


        }, function (err, data) {
            if (err){
                throw(err)
            }
            console.table(data)
            comp()
        })
    })
}

function viewEmp() {
    connection.query("SELECT * FROM employees ", function (err, data) {
        if (err) {
            throw (err)
        }

        console.table(data)
        comp()
    });


}
function viewRole() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) {
            throw (err)
        }
        console.table(data)
        comp()

    });
}
function addRole() {
    inquirer.prompt([{
        type: "input",
        name: "title",
        message: "Title?"
    },
    {
        type: "input",
        name: "salary",
        message: " salary?"

    },
    {
        type: "input",
        name: "depID",
        message: " department ID?"

    },
    ])
        .then(function (answer) {
            connection.query("INSERT INTO role SET ?", {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.depID,

            }, function (err, data) {
                if (err) {
                    throw (err)
                }
                console.table(data)
                comp()

            });
        })
}
function addDep(answer) {
    inquirer.prompt([{
        type: "input",
        name: "depName",
        message: " Department name?"

    }]).then(function (answer) {
        connection.query("INSERT INTO department SET ?", {
            name: answer.depName

        }, function (err, data) {
            if (err) {
                throw err;
            }
            console.table(data)
            comp()


        })
    })

}
   

function updateRole() {
    

    inquirer.prompt([{

        type: "input",
        name: "title",
        message: "Title?"
    },
    {
        type: "input",
        name: "salary",
        message: " salary?"

    },
    {
        type: "input",
        name: "depID",
        message: " department ID?"

    },
    ])
        .then(function (answer) {
            connection.query(
                "UPDATE role SET ?",
                [
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.depID,
                    },
                ],
                function (err, data) {
                    if (err) throw (err);
                    
                    console.table(data)
                    
                    comp()
                    
                }
                

            );
            
        })


}

