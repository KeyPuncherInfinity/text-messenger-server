var create = require('./creation');
var authenticate = require('./authentication');


class AccountManagement {
    createNewAccount = create.createNewAccount;

    authenticateAccount = authenticate.authenticateAccount;
}

module.exports = new AccountManagement();