let fs = require("fs");
let stream = require("stream");
let readline =require("readline");
let conf = "conf";
let lines= [];

let settings = new  Promise( (resolve) =>{
    let filestream = fs.createReadStream(conf);
    let outstream = new stream();
    let rl = readline.createInterface(filestream, outstream);
    let confops = null;
    rl.on('line', (line)  =>{
        lines.push(line);
    })
    rl.on('error', (error) => {
        console.log(error);
    })
    rl.on('close', () =>{
        confops = {
            host : lines[0].split('=')[1].replace(new RegExp('"', 'g'), ""),
            port : lines[1].split('=')[1].replace(new RegExp('"', 'g',), ""),
            userName : lines[2].split('=')[1].replace(new RegExp('"', 'g',), ""),
            userPass : lines[3].split('=')[1].replace(new RegExp('"', 'g',), ""),
            remoteFileName : lines[4].split('=')[1].replace(new RegExp('"', 'g',), ""),
            localFileName : lines[5].split('=')[1].replace(new RegExp('"', 'g',), "")
        }
        resolve(confops);
    });
});



module.exports = {settings};
