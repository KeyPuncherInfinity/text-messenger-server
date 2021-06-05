var db = require('./../psql/psqldb');


async function createNewAccount(email, password, name) {
    return await db.addAccount(email, password, name);
}




module.exports = { createNewAccount };