
var conn = require('./connection');

class db {
    async query(query) {
        
    }

    async addAccount(email, password, name, uid) {
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
            if (err.constraint == 'tm_users_loggedin_uid_key') {
                return {code: 2};
            }
            return {code: 0};
        }
    }

    async autologinAccount(uid, authtoken) {
        try {
            const result = await conn.client.query(`SELECT * FROM tm_users_loggedin WHERE uid='${uid}' AND authtoken='${authtoken}'`);
            if (result.rowCount == 1) {
                return {code: 1};
            } else {
                return {code: 0};
            }
        } catch (err) {
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


    async uidlookupfromauthtoken(authtoken) {
        try {
            const result = await conn.client.query(`SELECT uid FROM tm_users_loggedin WHERE authtoken='${authtoken}'`);
            if (result.rowCount == 0) {
                return {'uid': null};
            }
            return {'uid': result.rows[0].uid};
        } catch (err) {

        }
    }

    async uidlookupfromemail(email) {
        try {
            const result = await conn.client.query(`SELECT uid FROM tm_users_auth_cred WHERE email='${email}'`);
            if (result.rowCount == 0) {
                return {'uid': null};
            }
            return {'uid': result.rows[0].uid};
        } catch (err) {

        }
    }

    async addFriend(sender, l_uid, r_uid) {
        try {
            var status = sender == l_uid ? 'DOR' : 'DOL';
            const result = await conn.client.query(`INSERT INTO tm_users_relation_status VALUES('${l_uid}${r_uid}', '${l_uid}', '${r_uid}', '${status}')`);
            return {code: 1};
        } catch (err) {

        }
    }

    async fetchFriendList(uid) {
        try {
            const result = await conn.client.query(`SELECT email, name, l_uid, r_uid, status FROM tm_users_auth_cred, tm_users_relation_status WHERE tm_users_auth_cred.uid = tm_users_relation_status.l_uid AND r_uid='${uid}' UNION ALL SELECT email, name, l_uid, r_uid, status FROM tm_users_auth_cred, tm_users_relation_status WHERE tm_users_auth_cred.uid = tm_users_relation_status.r_uid AND l_uid='${uid}'`);
            var list = [];
            for (var row of result.rows) {
                list.push(row);
            }
            return list;
        } catch (err) {
            console.log(err);
        }
    }

}


module.exports = new db;

