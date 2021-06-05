var express = require('express')();
var http = require('http').createServer(express);
var socket = require('socket.io')(http, {
    cors: { origin: "*" }
});


var sock = require('./lib/socket/try');
var db = require('./lib/psql/connection');


sock.setupSocket(socket);


http.listen(3000, () => {
    console.log('Listening')
})