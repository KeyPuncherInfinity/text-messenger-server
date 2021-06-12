var express = require('express');
var db = require('./psql/psqldb');
var account = require('./account/account')

exports.setupApp = (app) => {
    
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));

    app.get('/', (req, res) => {
        res.send('API endpoint working!');
    })


    app.post('/register', async (req, res) => {
        var result = await account.createNewAccount(req.body.email, req.body.password, req.body.name);
        res.send(JSON.stringify(result));
    })

    app.post('/login', async (req, res) => {
        var result = await account.authenticateAccount(req.body.email, req.body.password);
        res.send(JSON.stringify(result));
    })

    app.post('/logout', async (req, res) => {
        var result = await account.logoutAccount(req.body.uid);
        res.send(JSON.stringify(result));
    })

}


