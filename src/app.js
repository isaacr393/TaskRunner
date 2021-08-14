//Config
const inquirer = require('inquirer');
require('dotenv').config()
const path = require('path')


//Global Variables
global.__rootDir = path.resolve('./')

//Questions For user input
let mainMenuQuestions = require('./questions/mainMenu')

//Importing Modules
const createTask = require('./createTask')
const manageTask = require('./ManageTask')

//Main Program
main()

async function main (){

    do{
        mainMenu()
            
        let answers = await inquirer.prompt(mainMenuQuestions)

        if(answers.option == process.env.CREATE_TASK)
            await createTask()
        if(answers.option == process.env.MANAGE_TASK)
            await manageTask()
        if(answers.option == process.env.RUN_TASK)
            await manageTask()
        else if(answers.option == 'Exit')
            process.exit(0);
    }while(true)
}

function mainMenu(){
    process.stdout.write('\033c');
    console.log('***************************************************************')
    console.log('\t\tWELCOME TO TASK RUNNER\n')
}



    
    