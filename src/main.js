import fs from 'fs';
import Console from './console-adapter';
import Inquirer from 'inquirer';
import OpenLdapValve from './openldap-valve'

main();

function main() {
    Console.title({
        text: 'Data Valve',
        author: 'Eduardo Eljaiek Rodriguez'
    });

    getOutputFolder().then((answers) => {
        new OpenLdapValve(answers.output, 300).open();
    });
}

function getOutputFolder() {
    let question = [{
        name: 'output',
        type: 'input',
        message: 'Enter output directory:',
        validate: function (value) {
            try {
                fs.statSync(value);
                return true
            } catch (e) {
                return 'Please enter a valid output directory';
            }
        }
    }];

    return Inquirer.prompt(question);
}