//Config
const inquirer = require('inquirer');
require('dotenv').config()

//Questions For user input
let mainMenuQuestions = require('./questions/mainMenu')

//Importing Modules
const createTask = require('./createTask')

//Main Program
main()

async function main (){
    mainMenu()
        
    let answers = await inquirer.prompt(mainMenuQuestions)

    if(answers.option == process.env.CREATE_TASK)
        await createTask()

    process.exit(0);
}

function mainMenu(){
    process.stdout.write('\033c');
    console.log('***************************************************************')
    console.log('\t\tWELCOME TO TASK RUNNER\n')
}



    
    