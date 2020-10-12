
![License: MIT ](https://img.shields.io/badge/License-MIT-yellow.svg)
# Template Engine

## Authors: 
Alex Milroy  

## Table of contents:
* [Files](#Files)
* [Description](#Description)
* [Installation](#Installation)
* [Uses](#Uses)
* [License](#License)
* [Contributions](#Contributions)
* [Tests](#Tests)
* [Contact](#Contact)

## Files
* app.js
* package-lock.json
* package.json

### Library
* Employee.js
* Engineer.js
* htmlRenderer.js
* intern.js
* Manager.js

### Templates
* engineer.html
* intern.html
* main.html
* manager.html

### Test
* Employee.test.js
* Engineer.test.js
* Intern.test.js
* Manager.test.js

### Images
* inquirer.png
* output.png
* packages.png
* test_suite.png


## Description
The template engine is a small application that helps HR staff build engineering team cards for all of their engineers quickly and easily by following simple command line prompts from a node module. The user is asked a number of questions about each employee, which are then structured using objects, and passed to a function which inserts the information into HTML templates. The final HTML file is then automatically generated based on the users input.

## Installation
To run this applications, users must install all required NPM packages, and run the node application from a command prompt by typing" node index.js" to initialize the program.

## Uses
First, ensure that all required NPM packages have been sucessfully installed. Then, open a new command prompt window, and type "Node index.js" into the prompt. Then, answer the on-screen prompts to answer each question. After entering one employee, the system will ask if you wish to add another employee. You can either hit enter, or type "y" if you wish to add another employee, or type "n" to end the program and render your entered employees.

A video of the application can be found here: https://drive.google.com/file/d/1gGe_IddUMIpZRd_EOAE0wepBgPGspRxg/view

## License
This application is goverened by the MIT license.

## Contributions
Yes

## Tests
Users can run the included test suite by opening a new console window, and typing "npm run test". This will run the built in test suite, which will return results about if the application is ready to run correctly without error.
    
## Contact:
github.com/ajm5099
amilroy@gmail.com

## Images:
![Site Screenshot](images/inquirer.png)
![Site Screenshot](images/output.png)
![Site Screenshot](images/packages.png)
![Site Screenshot](images/test_suite.png)
