var client = require('./client');


exports.setupSocket = function (socket) {

    var ActiveUsers = new Map();
    socket.on('connection', (conn) => {
        client.clientsetup(conn, ActiveUsers);
    })
}

