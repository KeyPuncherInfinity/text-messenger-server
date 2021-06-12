var db = require('./../psql/psqldb');

exports.clientsetup = function (client) {

    var ActiveUsers = new Map();
    
    client.on('authtoken', async (data) => {
        result = await db.uidlookup(data.authtoken);
        ActiveUsers.set(result.uid, client.id);
        console.log(ActiveUsers);
    })

    client.on('disconnect', async (data) => {
        ActiveUsers.forEach((value, key, instance) => {
            instance.delete(key);
            console.log(instance);            
        })
    })
}