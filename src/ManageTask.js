const inquirer = require('inquirer')
const Task = require('./Task').Task
const fs = require('fs')
const path = require('path')
const readline = require('readline');
const askQuestion = require('./utilidades').askQuestion
const nameOfAction = require('./questions/manageTask').action

inquirer.registerPrompt('fileTree', require('inquirer-file-tree-selection-prompt'))

async function main(){
    process.stdout.write('\033c');
    console.log('***************************************************************')
    console.log('\t\tMANAGE TASK MODULE\n')        

    const action = await inquirer.prompt(nameOfAction)

    if( action.option == 'Delete')
        await deleteTask()


    await askQuestion("Press enter to continue");
    return
}

async function deleteTask(){
    let pathOfDataFile = process.env.PATH_OF_DATA
    let nameOfDataFile = process.env.NAME_OF_DATA_FILE

    let completeRoute = path.join( global.__rootDir,pathOfDataFile,nameOfDataFile)
    console.log('\nRoute for searching data: ', completeRoute ,'\n')

    if( !fileExist(completeRoute) ){
        console.log('No tasks registered')
        return false
    }

    let tasks = retrieveTasks(completeRoute)
    const action = await inquirer.prompt(questionTask(tasks))
    removeTaskFromFile(completeRoute, action.option, tasks)
    console.log('Task removed successfully')
    return true
}

function fileExist( path ){
    if (fs.existsSync(path)) {
        return true
    }   
    return false
}

function retrieveTasks(path){
    let fileContent = fs.readFileSync(path, {encoding:'utf8', flag:'r'})
    let tasks = JSON.parse(fileContent)
    return tasks = tasks.map( task =>{
        return new Task( task.name, task.path, task.execControl )
    })
}

function questionTask(tasks){
    let choices = tasks.map( task => task.name)
    return {
        type: 'list',
        name: 'option',
        message: 'Choose a task',
        choices
    }
}

function removeTaskFromFile( path, task, tasks ){
    let newTasks = tasks.filter( tsk => tsk.name != task )
    if( newTasks.length < 1 ){
        try {
            fs.unlinkSync(path)
            //file removed
        } catch(err) {
            console.error(err)
        }
    }
    else{
        let serializedObject = JSON.stringify(newTasks)
        fs.writeFileSync(path, serializedObject )
    }
}


module.exports = main

