let net =  require("net");
let config = require("./Config/config");
let user = require("./Commands/user");
let pass  = require("./Commands/pass");
let stor = require("./Commands/stor");
let consolereader = require("./Console/consolereader");
let dele = require("./Commands/dele");
let retr = require("./Commands/retr");


console.log("Welcome to my simple FTP client \n");
config.settings.then((settings) => {
    let socket = net.Socket();
    socket.connect(settings.port, settings.host, () => {
        console.log("loging with user in conf file");
        auth(settings.userName, settings.userPass, socket);
        console.log("please select from menu\n",
            "1.Store fiile\n",
            "2.delete\n", "" +
            "3.download\n");
        consolereader.readLine().then((selector) => {
            switch (selector) {
                default:
                    console.log("no selection found for "+selector);
                    break;
                case '1':
                    storeFile(settings.remoteFileName, socket)
                    break;
                case '2':
                    deleteFile(settings.remoteFileName, socket)
                    break;
                case '3':
                    downloadFile(settings.remoteFileName, socket);
                    break;
            }
            socket.on('data', (data) => {

                console.log(selector)
                if (selector == '1') {
                    handleStore(data, settings);
                }
                if (selector == '3'){
                    console.log("attempting to download")
                    handleRetr(data, settings);
                }
            })
        });
    })
});



function deleteFile(remoteFileName, socket) {
    socket.write(dele.send(remoteFileName));
}

function auth(username, password, socket) {
    console.log("sending command "+user.send(username))
    socket.write(user.send(username));
    socket.write(pass.send(password));
}


function storeFile(fileName, socket) {
    let comamnds = stor.send(fileName);
    for (let i = 0; i<comamnds.length; i++){
        socket.write(comamnds[i]);
    }
}

function downloadFile(fileName, socket) {
    let commands = retr.send(fileName);
    for (let i =0; i<commands.length; i++){
        socket.write(commands[i]);
    }

}

function handleStore(data,settings) {
    console.log(data.toString());
    if (data.includes("227")){
        let p1 =parseInt(data.toString().replace(new RegExp("^ *(.*\\b(?:227)\\b.*) *$"), "g").split(",")[4]);
        let p2 =parseInt((data.toString().replace(new RegExp("^ *(.*\\b(?:227)\\b.*) *$"), "g").split(",")[5].replace(")", "")));
        let port  =(p1*256+ p2);
        stor.sendFile(port, settings.host, settings.localFileName);
    }
}

function handleRetr(data,settings) {
    console.log(data.toString());
    if (data.includes("227")){
        let p1 =parseInt(data.toString().replace(new RegExp("^ *(.*\\b(?:227)\\b.*) *$"), "g").split(",")[4]);
        let p2 =parseInt((data.toString().replace(new RegExp("^ *(.*\\b(?:227)\\b.*) *$"), "g").split(",")[5].replace(")", "")));
        let port  =(p1*256+ p2);
        retr.getFile(port, settings.host, settings.localFileName);
    }
}
