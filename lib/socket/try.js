
exports.setupSocket = function (socket) {
    socket.on('connection', (conn) => {
        console.log('Connected: ' + conn.id);
    })
}

