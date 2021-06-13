var create = require('./creation');
var authenticate = require('./authentication');
var logout = require('./logout');


class AccountManagement {
    async createNewAccount(email, password, name) {
        return await create.createNewAccount(email, password, name);
    }

    async authenticateAccount(email, password){
        return await authenticate.authenticateAccount(email, password);
    } 

    async autologinAccount(uid, authtoken) {
        return await authenticate.autologinAccount(uid, authtoken);
    }

    async logoutAccount(uid) {
        return await logout.logoutAccount(uid);
    }
}

module.exports = new AccountManagement();