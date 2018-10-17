var readline = require('readline');


 function readLine () {
    return new Promise((resolve) => {

        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        rl.on('line', (lines) =>{
            resolve(lines);
        })
    })
}




module.exports = {readLine}