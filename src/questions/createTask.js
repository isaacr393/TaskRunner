const nameOfTask = {
    type: 'input',
    name: 'name',
    message: 'Name of the task?',
    validate: function( input ){
        str = input.replace(/\s+/g, '');
        if( str.length < 1)
            return false
        return true
    }
}

const nameOfFile ={
    type: 'fileTree',
    name: 'from',
    root: 'C:\\'
}

const exControl = {
    type: 'list',
    name: 'option',
    message: 'How you want to run this task?',
    choices:['Manually', 'Automatic']
}


module.exports = {
    nameOfTask,
    nameOfFile,
    exControl
}



