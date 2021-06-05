CREATE TABLE tm_users_auth_cred(
    uid VARCHAR(30) PRIMARY KEY UNIQUE, 
    email VARCHAR(30) UNIQUE, password VARCHAR(30)
);

CREATE TABLE tm_misc_test(
    result VARCHAR(30)
);