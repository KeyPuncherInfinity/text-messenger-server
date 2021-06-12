var db = require('./../psql/psqldb');
var random = require('random');


async function createNewAccount(email, password, name) {
    var uid = random.int(100000, 999999)
    return await db.addAccount(email, password, name, uid);
}




module.exports = { createNewAccount };