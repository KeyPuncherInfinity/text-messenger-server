var express = require('express')();
var http = require('http').createServer(express);
var socket = require('socket.io')(http, {
    cors: { origin: "*" }
});

var sock = require('./lib/socket/socketsetup');
var conn = require('./lib/psql/connection');
var app = require('./lib/app');


run();

async function run() {

    sock.setupSocket(socket);
    app.setupApp(express);

    
    http.listen(80, () => {
        console.log('Listening')
    })
}

