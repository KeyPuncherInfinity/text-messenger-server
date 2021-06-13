var db = require('./../psql/psqldb');
var messenger = require('./../messenger/messenger');
const { Socket } = require('socket.io');

exports.clientsetup = function (client, AU) {
    
    client.on('authtoken', async (data, callback) => {
        result = await db.uidlookupfromauthtoken(data.authtoken);
        if (result.uid != null) {
            AU.set(result.uid, client.id);
            callback({});
        }
    })

    client.on('disconnect', async (data) => {
        AU.forEach((value, key, instance) => {
            if (client.id == value) {
                instance.delete(key);       
            }
        }) 
    })

    client.on('add_friend', async (data, callback) => {
        for (activeconnection of AU) {
            if (activeconnection[1] == client.id) {
                break;
            }
        }
        var id_from_email = await db.uidlookupfromemail(data.email);
        var result = await messenger.addFriend(activeconnection[0], id_from_email.uid);
        if (AU.has(id_from_email.uid)) {
            client.to(AU.get(id_from_email.uid)).emit('refresh-friend-list');
        }
        callback(JSON.stringify(result));
    })

    client.on('fetch_friend_list', async (data, callback) => {
        for (activeconnection of AU) {
            if (activeconnection[1] == client.id) {
                break;
            }
        }
        var result = await messenger.fetchFriendList(activeconnection[0]);
        callback(JSON.stringify(result));
    })


}