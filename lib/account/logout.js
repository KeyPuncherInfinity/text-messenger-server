var db = require('./../psql/psqldb');


async function logoutAccount(uid) {
    return await db.logoutAccount(uid);
}




module.exports = { logoutAccount };