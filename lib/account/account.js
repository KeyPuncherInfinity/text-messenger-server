var create = require('./creation');
var authenticate = require('./authentication');


class AccountManagement {
    async createNewAccount(email, password, name) {
        return await create.createNewAccount(email, password, name);
    }

    async authenticateAccount(email, password){
        return await authenticate.authenticateAccount(email, password);
    } 
}

module.exports = new AccountManagement();