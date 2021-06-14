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
            client.to(AU.get(id_from_email.uid)).emit('refresh_friend_list');
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

    client.on('accept_request', async (data, callback) => {
        for (activeconnection of AU) {
            if (activeconnection[1] == client.id) {
                break;
            }
        }
        var f_uid = data.uid;
        var s_uid = activeconnection[0];
        var result = await messenger.acceptRequest(f_uid, s_uid);
        callback(JSON.stringify(result));
    })

    client.on('decline_request', async (data, callback) => {
        for (activeconnection of AU) {
            if (activeconnection[1] == client.id) {
                break;
            }
        }
        var f_uid = data.uid;
        var s_uid = activeconnection[0];
        var result = await messenger.declineRequest(f_uid, s_uid);
        callback(JSON.stringify(result));
    })

    client.on('send', async (data, callback) => {
        for (activeconnection of AU) {
            if (activeconnection[1] == client.id) {
                break;
            }
        }
        client.to(AU.get(data['recipient'])).emit('recieve', JSON.stringify(
            {
                'content': data['content'],
                'type': 'incoming',
                'recipient': 'self',
                'owner': activeconnection[0],
            }
        ))
        callback({code: 1});
    });
}