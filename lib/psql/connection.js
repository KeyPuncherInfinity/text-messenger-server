require('dotenv').config();

const { Client } = require('pg');

class Connection {
   
    constructor() {

        this.client = new Client({
            user: process.env.PSQL_USER,
            host: process.env.PSQL_HOST,
            database: process.env.PSQL_DATABASE,
            password: process.env.PSQL_PASSWORD
        }),
        
        this.client.connect();
        this.client.query('SELECT * FROM tm_misc_test', (err, res) => {
            console.log(res.rows[0].result);
        });
    }
}

module.exports = new Connection();
