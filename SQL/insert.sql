USE noikokira;
insert into admin (username, password) values('admin', 'admin');

CALL createUser('tesmMail', 'testUsername', 'testPassword');

CALL updateUser(1,'changeEmail', 'usadasdrnm', 'pass');

SELECT * FROM user;