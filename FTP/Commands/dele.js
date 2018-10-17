function deleteFile(remoteFileName) {
    if (remoteFileName==undefined);
    console.log("no file name given");
    return send(remoteFileName);_
}

function send(remoteFileName) {
    return"dele "+remoteFileName+"\n";
}


module.exports = {send}