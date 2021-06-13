var db = require('./../psql/psqldb');

class Messenger {
    async addFriend(uid, f_uid) {
        if (f_uid != null && uid != f_uid) {
            var l_uid = uid < f_uid ? uid : f_uid;
            var r_uid = uid > f_uid ? uid : f_uid;

            var result1 = await db.addFriend(uid, l_uid, r_uid);
            return result1;
            
        }
        return {code: 2};
    }

    async fetchFriendList(uid) {
        var result = await db.fetchFriendList(uid);
        result.forEach((value, key, arr) => {
            if (uid == value.l_uid) {
                value.id = value.r_uid;
                if (value.status == 'DOR') {
                    value.status = 'sent';
                } else if (value.status == 'DOL') {
                    value.status = 'recieved';
                } else {
                    value.status = 'mutual';
                }
            } else {
                value.id = value.r_uid;
                if (value.status == 'DOR') {
                    value.status = 'recieved';
                } else if (value.status == 'DOL') {
                    value.status = 'sent';
                } else {
                    value.status = 'mutual';
                }
            }
            delete value.r_uid;
            delete value.l_uid;

        });
        return result;
    }
}

module.exports = new Messenger;