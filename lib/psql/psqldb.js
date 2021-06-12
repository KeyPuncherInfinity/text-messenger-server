
var conn = require('./connection');

class db {
    async query(query) {
        
    }

    async addAccount(email, password, name) {
        try {
            const result = await conn.client.query(`INSERT INTO tm_users_auth_cred VALUES('${uid}', '${email}', '${password}', '${name}')`);
            if (result.rowCount == 1) {
                return {code: 1};
            } else {
                return {code: 0};
            }
        } catch (err) {
            console.log(err);
            if (err.detail == 'Key (email)=() already exists.') {
                return {code: 2};
            }
            return {code: 0};
        }
    }

    async authenticateAccount(email, password, authtoken) {
        try {
            const result = await conn.client.query(`SELECT uid, password FROM tm_users_auth_cred WHERE email='${email}'`);
            if (result.rowCount == 1 && result.rows[0].password == password) {
                const result2 = await conn.client.query(`INSERT INTO tm_users_loggedin VALUES('${authtoken}', '${result.rows[0].uid}')`);
                if (result2.rowCount == 1) {
                    return {code: 1, uid: result.rows[0].uid, authtoken: authtoken};
                }
                else {
                    return {code: 0}; 
                }
            } else {
                return {code: 0}; // No account with the provided email
            }
        } catch (err) {
            console.log(err);
            return {code: 0};
        }
    }

    async logoutAccount(uid) {
        try {
            const result = await conn.client.query(`DELETE FROM tm_users_loggedin WHERE uid='${uid}'`);
            if (result.rowCount == 1) {
                return {code: 1};
            }
        } catch (err) {
            console.log(err);
            return {code: 0};
        }
    }


    async uidlookup(authtoken) {
        try {
            const result = await conn.client.query(`SELECT uid FROM tm_users_loggedin WHERE authtoken='${authtoken}'`);
            return {'uid': result.rows[0].uid};
        } catch (err) {

        }
    }

}


module.exports = new db;

