const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices:[process.env.CREATE_TASK, process.env.MANAGE_TASK, 'Run Tasks','Config','Exit']
    }
]

module.exports = questions



