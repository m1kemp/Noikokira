USE noikokira;
insert into admin (username, password) values('admin', 'admin');

CALL createUser('testUser', 'testUser', 'testUser');

CALL updateUser(1,'changeEmail', 'usadasdrnm', 'pass');

SELECT * FROM user;