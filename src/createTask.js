const inquirer = require('inquirer')
const Task = require('./Task').Task
const nameOfTaskQuestion = require('./questions/createTask').nameOfTask
const nameOfFileQuestion = require('./questions/createTask').nameOfFile
const exControlQuestion = require('./questions/createTask').exControl

inquirer.registerPrompt('fileTree', require('inquirer-file-tree-selection-prompt'))

async function main(){
    process.stdout.write('\033c');
    console.log('***************************************************************')
    console.log('\t\tCREATE TASK MODULE\n')
    
    const nameOfTask = await inquirer.prompt(nameOfTaskQuestion)
    const nameOfFile = await inquirer.prompt(nameOfFileQuestion)
    const executionControl = await inquirer.prompt(exControlQuestion)

    let newTask = new Task(nameOfTask.name, nameOfFile.from, executionControl.option)
    console.log(newTask)
}

module.exports = main