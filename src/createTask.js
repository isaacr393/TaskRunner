const inquirer = require('inquirer')
const Task = require('./Task').Task
const fs = require('fs')
const path = require('path')
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
    let pathOfDataFile = process.env.PATH_OF_DATA
    let nameOfDataFile = process.env.NAME_OF_DATA_FILE

    let completeRoute = path.join( global.__rootDir,pathOfDataFile,nameOfDataFile)
    console.log('\nRoute for searching data: ', completeRoute ,'\n')

    let dataFileExists = fileExist( completeRoute )

    if( dataFileExists )
        updateDataFromFile(completeRoute, newTask)
    else        
        notExistFile(newTask, completeRoute)
    
    return
}

function fileExist( path ){
    if (fs.existsSync(path)) {
        return true
    }   
    return false
}

async function notExistFile(objectToSerialize, path){
    console.log(' Does not exists ')    
    let arr = []
    arr.push(objectToSerialize)
    let serializedObject = JSON.stringify(arr)
    fs.writeFileSync(path, serializedObject )
    console.log('Task added succesfully')
    console.log('Press any key to continue.');
    
    return true
}

function updateDataFromFile(path, task){
    console.log( 'File exist' )
    let fileContent = fs.readFileSync(path, {encoding:'utf8', flag:'r'})
    let prevData = JSON.parse(fileContent)

    if( checkIfTaskExist(task, prevData) )
        return false

    prevData.push( task )
    let serializedObject = JSON.stringify(prevData)
    fs.writeFileSync(path, serializedObject )
    console.log('Task added succesfully')
    return true
}

function checkIfTaskExist(task, tasks){
    return tasks.some( (element) =>{
        return element.name === task.name
    })
}

module.exports = main