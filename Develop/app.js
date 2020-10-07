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
        // 2: email
        type: "input",
        message: "What is the employees email?",
        name: "employeeEmail"
    }, {
        // 3: role
        type: "list",
        message: "What role is the employee?",
        name: "employeeRole",
        choices: ["Manager", "Engineer", "Intern"]
    }, {
        // 4.1: Office number, only called if a manager is selected on question 3
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
        when: function (answers) {
            return answers.employeeRole === "Manager";
        }
    }, {
        // 4.2: Github username, only called if a engineer is selected on question 3
        type: "input",
        message: "What is the employees Github username?",
        name: "github",
        when: function (answers) {
            return answers.employeeRole === "Engineer";
        }
    }, {
        // 4.3: school, only called if intern is selected on question 3
        type: "input",
        message: "What school is the intern attending?",
        name: "school",
        when: function (answers) {
            return answers.employeeRole === "Intern";
        }
    }, {
        //5: Loop, asking if user wants to add additional employees
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
        if (answers.employeeRole === "Manager") {
            person = new Manager(answers.employeeName, answers.employeeRole, answers.employeeEmail, Date.now() , answers.officeNumber)
        } else if (answers.employeeRole === "Engineer") {
            person = new Engineer(answers.employeeName, answers.employeeRole, answers.employeeEmail, Date.now(),  answers.github)
        } else if (answers.employeeRole === "Intern") {
            person = new Intern(answers.employeeName, answers.employeeRole, answers.employeeEmail, Date.now(), answers.school)
        }
        //Loop to determine if user input questions should be run again from the beginning
        answersArr.push(person)
        if (answers.askAgain) {
            ask();
        } else {
            //after user has input all exployees desired, call the render function and pass it an array
            console.log("This is the person array " + JSON.stringify(person));
            console.log("This is the answers array: " + JSON.stringify(answersArr));
            //render(answersArr);
            fs.writeFileSync(outputPath, render(answersArr),"utf-8");
            return;
        }
    })
}

ask();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
