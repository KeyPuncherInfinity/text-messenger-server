var db = require('./../psql/psqldb');
var random = require('random');


async function authenticateAccount(email, password) {
    var authtoken = random.int(100000, 999999);
    return await db.authenticateAccount(email, password, authtoken);
}




module.exports = { authenticateAccount };