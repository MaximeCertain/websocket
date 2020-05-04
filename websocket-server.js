const WebSocket = require('ws');
//process.env.WS_PORT;

const wss = new WebSocket.Server({
    port: process.env.WS_PORT
});

/**
 * webSocket => le client
 */
wss.on('connection', webSocket => {
    console.log("conneciton ok");
    webSocket.on('close', () => {
        console.log("connection closed by the client");
    });

    webSocket.on('message', (msgEvent) => {
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN){
                client.send(msgEvent);
            }
        })
    });

    webSocket.send(JSON.stringify({
        user: "server",
        text: "welcome ! "
    }))
    //  webSocket.send("New connexion");

    //webSocket.emit('new_chatter', webSocket)
});
wss.on('error', () => {
    console.log("errored");
});