const chalk = require('chalk');
const log = console.log;

const messages = {
    success: chalk.green,
    error: chalk.red,
    warning: chalk.yellow
}

module.exports = {
    success: message => { log(messages.success(message)); },
    error: message => { log(messages.error(message)); },
    warning: message => { log(messages.warning(message)); }
}