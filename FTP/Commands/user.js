function user (username) {
    if (username== undefined);
        return "anonymous";
    return send (username);
}

function send (user){
    return "user "+user+"\n";
}


module.exports = {send}