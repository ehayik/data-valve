import clear from 'cli-clear';
import Chalk from 'chalk';
import Figlet from 'figlet';

const error = Chalk.bold.red;

const info = Chalk.blue.bold;

const success = Chalk.green.bold;

export default class Console {

    static title(options) {
        this.clear();
        let appTitle = Chalk.yellow(Figlet.textSync(options.text, {horizontalLayout: 'full'}));
        console.log(appTitle);
        this.info(`Author: ${options.author}`);
    }

    static clear() {
        clear();
    }

    static error(message) {
        console.log(error(message));
    }

    static info(message) {
        console.log(info(message));
    }

    static success(message) {
        console.log(success(message));
    }
}