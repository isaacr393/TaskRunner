const readline = require('readline');
//Promisifies a function that expects a callback
function promisify( f ){

    return function (...args) {
        return new Promise( (resolve, reject) =>{
            //Obtenemos todos los parametros enviados a la funcion
            let args = [...arguments]
            args = args.filter( (arg, index) => {
                return index > 0
            })
            //Llamamos a la funcion que se quiere usar como promesa con los argumentos pasados y con el callback que reciba un error o el resultado
            f.call(this, args, (err, result) =>{
                if(err)
                    reject(err)
                else
                    resolve(result)
            })
        })
    }
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

module.exports = {
    promisify: promisify,
    askQuestion
}