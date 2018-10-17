let net =  require("net");
let fs = require("fs");


function stor(filename) {
    if (filename==undefined);
    console.log("no file name")
    return send(filename);
}

function send(filename) {
    let  commands = [];
    commands[0] = "PASV \n"
    commands[1] = "stor "+filename+"\n";
    return commands;
}

function sendFile(port, ip, fileName){
  let fileData = fs.readFileSync(fileName);
  let socket = new net.Socket();
  socket.connect(port,ip);
  socket.on("connect", () =>{
      socket.write(fileData);
      socket.end()
  });

}

module.exports = {send, sendFile}