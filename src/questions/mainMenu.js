const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices:[process.env.CREATE_TASK, 'Manage Tasks', 'Run Tasks','Config']
    }
]

module.exports = questions



