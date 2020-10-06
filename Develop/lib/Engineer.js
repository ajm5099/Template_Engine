const Employee = require("./Employee")
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

class Engineer extends Employee {
    //in the constructor, include everything you are asking for, including what you are importing with super
    constructor (name, id, email, github) {
        //this is taking the name, ID and email directly from the employee class, and placing them here. You dont need to as kfor these again, because they are being transported here using super. However, you need to include them in the constructor.
        super (name, id, email);
        this.github = github;
    }

    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Employee;