CREATE TABLE tm_misc_test(
    result VARCHAR(30)
);


CREATE TABLE tm_users_auth_cred(
    uid VARCHAR(30) PRIMARY KEY UNIQUE, 
    email VARCHAR(30) UNIQUE, 
    password VARCHAR(30), 
    name VARCHAR(30)
);

CREATE TABLE tm_users_loggedin(
    authtoken VARCHAR(30) PRIMARY KEY UNIQUE, 
    uid VARCHAR(30) UNIQUE, 
    FOREIGN KEY(uid) REFERENCES tm_users_auth_cred(uid)
);

CREATE TABLE tm_users_relation_status(
    id VARCHAR(30) PRIMARY KEY, 
    l_uid VARCHAR(30), 
    r_uid VARCHAR(30), 
    FOREIGN KEY(l_uid) REFERENCES tm_users_auth_cred(uid), 
    FOREIGN KEY(r_uid) REFERENCES tm_users_auth_cred(uid),
    status VARCHAR(10)
);
