var express = require('express')();
var http = require('http').createServer(express);
var socket = require('socket.io')(http, {
    cors: { origin: "*" }
});

socket.on('connection', (conn) => {
    console.log('Connected: ' + conn.id);
})

http.listen(3000, () => {
    console.log('Listening')
})