var client = require('./client');


exports.setupSocket = function (socket) {


    socket.on('connection', (conn) => {

        client.clientsetup(conn);
    })
}

