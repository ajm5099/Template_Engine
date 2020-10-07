//===============================================================================
// Global Variables
//===============================================================================

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let answersArr = [];

//===============================================================================
// Questions to ask the user
//===============================================================================

const questions = [
    {
        // 1: name
        type: "input",
        message: "What is the employees name?",
        name: "employeeName"
    }, {
        // 2: ID
        type: "input",
        message: "What is the employees ID?",
        name: "employeeID"
    }, {
        // 3: email
        type: "input",
        message: "What is the employees email?",
        name: "employeeEmail"
    }, {
        // 4: role
        type: "list",
        message: "What role is the employee?",
        name: "employeeRole",
        choices: ["Manager", "Engineer", "Intern"]
    }, {
        // 5.1: Office number, only called if a manager is selected on question 3
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
        when: function (answers) {
            return answers.employeeRole === "Manager";
        }
    }, {
        // 5.2: Github username, only called if a engineer is selected on question 3
        type: "input",
        message: "What is the employees Github username?",
        name: "github",
        when: function (answers) {
            return answers.employeeRole === "Engineer";
        }
    }, {
        // 5.3: school, only called if intern is selected on question 3
        type: "input",
        message: "What school is the intern attending?",
        name: "school",
        when: function (answers) {
            return answers.employeeRole === "Intern";
        }
    }, {
        //6: Loop, asking if user wants to add additional employees
        type: "confirm",
        message: "Would you like to add another employee? (hit enter for yes)",
        default: true,
        name: "askAgain",
    }
];

//===============================================================================
// Functions to ask questions and write output
//===============================================================================

function ask() {
    inquirer.prompt(questions).then((answers) => {
        let person;
        //Loop to determine selected role
        console.log("answers", answers)
        //pass all answer data to manager object to create a new manager
        if (answers.employeeRole === "Manager") {
            person = new Manager(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.officeNumber)
        }
        //pass all answer data to engineer object to create a new engineer 
        else if (answers.employeeRole === "Engineer") {
            person = new Engineer(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.github)
        } 
        //pass all answer data to intern object to create a new intern
        else if (answers.employeeRole === "Intern") {
            person = new Intern(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.school)
        }
        //Loop to determine if user input questions should be run again from the beginning
        answersArr.push(person)
        //question that will loop inquirer if answer is yes
        if (answers.askAgain) {
            ask();
        } else {
            //after user has input all exployees desired, Write the data so that the renderer function can recieve the data and run it.
            console.log(JSON.stringify(answersArr));
            fs.writeFileSync(outputPath, render(answersArr),"utf-8");
            return;
        }
    })
}

ask();