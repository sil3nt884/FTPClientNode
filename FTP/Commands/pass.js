function pass(password) {
   if (password==undefined);
   console.log("no password set");
 return send(password);
}

function send (pass){
    return "pass "+pass+"\n";
}


module.exports = {send}