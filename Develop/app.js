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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = [
    {
        type: "input",
        message: "What is the employees name?",
        name: "employeeName"
    }, {
        type: "input",
        message: "What is the employees email?",
        name: "employeeEmail"
    }, {
        type: "list",
        message: "What role is the employee?",
        name: "employeeRole",
        choices: ["Employee", "Manager", "Engineer", "Intern"]
    }, {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
        when: function (answers) {
            return answers.employeeRole === "Manager";
        }
    }, {
        type: "input",
        message: "What is the employees Github username?",
        name: "github",
        when: function (answers) {
            return answers.employeeRole === "Engineer";
        }
    }, {
        type: "input",
        message: "What school is the intern attending?",
        name: "school",
        when: function (answers) {
            return answers.employeeRole === "Intern";
        }
    }, {
        type: "confirm",
        message: "Would you like to add another employee? (hit enter for yes)",
        default: true,
        name: "askAgain",
    }
];
    


function ask() {
    inquirer.prompt(questions).then((answers) => {
        let person;
        if (answers.employeeRole === "Manager") {
            person = new Manager(answers.name, Date.now(), answers.email, answers.officeNumber)
        } else if (answers.employeeRole === "Employee") {
            person = new Employee(answers.name, Date.now(), answers.email)
        } //create for intern and engineer
            
        answersArr.push(person)
        if (answers.askAgain) {
            ask();
        } else {
            console.log(answersArr);
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
