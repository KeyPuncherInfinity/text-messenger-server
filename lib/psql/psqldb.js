var random = require('random');
var conn = require('./connection');

class db {
    async query(query) {
        
    }

    async addAccount(email, password, name) {
        var uid = random.int(1000, 9999)
        try {
            const result = await conn.client.query(`INSERT INTO tm_users_auth_cred VALUES('${uid}', '${email}', '${password}', '${name}')`);
            if (result.rowCount == 1) {
                return 1;
            } else {
                return 0;
            }
        } catch (err) {
            console.log(err);
            return 0;
        }
    }

        async authenticateAccount(email, password) {
        try {
            const result = await conn.client.query(`SELECT password FROM tm_users_auth_cred WHERE email='${email}'`);
            if (result.rowCount == 1 && result.rows[0].password == password) {
                return 1;
            } else {
                return 0;
            }
        } catch (err) {
            console.log(err);
            return 0;
        }
    }

}


module.exports = new db;

