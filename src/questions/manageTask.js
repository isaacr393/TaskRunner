const action = {
    type: 'list',
    name: 'option',
    message: 'What would you like to do',
    choices:['Update', 'Delete']
}

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

module.exports = {
    action,
}



