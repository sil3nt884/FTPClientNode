let net =  require("net");
let fs = require("fs");

function rert(remoteFileName) {
    if (remoteFileName!=undefined);
    console.log("no remote filename");
    return send(remoteFileName);
}

function send(remoteFileName) {
    let commands = [];
    commands[0] = "PASV \n";
    commands[1] = "RETR "+remoteFileName+"\n"
    return commands;
}

function getFile(port, ip, fileName) {
    let socket = new net.Socket();
    socket.connect(port,  ip);
    socket.on('data', (data) =>{
       let write= fs.createWriteStream("./Downloads/"+fileName);
       write.write(data);
       write.end();
    });
}

module.exports = {send,  getFile}