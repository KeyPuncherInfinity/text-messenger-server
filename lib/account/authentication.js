var db = require('./../psql/psqldb');


async function authenticateAccount(email, password, name) {
    return await db.authenticateAccount(email, password, name);
}




module.exports = { authenticateAccount };