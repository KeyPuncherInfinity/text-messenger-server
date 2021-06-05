require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD
});

client.connect();


client.query('SELECT * FROM tm_misc_test', (err, res) => {
    console.log(res.rows[0].result);
});


