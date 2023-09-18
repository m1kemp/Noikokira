USE noikokira;
insert into admin (username, password) values('admin', 'admin');

CALL createUser('testUser', 'testUser', 'testUser');

CALL updateUser(1,'changeEmail', 'usadasdrnm', 'pass');

SELECT * FROM offer WHERE likes = 1;

SELECT store_id FROM store;

SELECT offer.store_id, item.item_name FROM offer INNER JOIN item ON offer.item_id = item.item_id WHERE item.item_name LIKE 'Ο%';

SELECT store.store_name FROM (store INNER JOIN offer ON offer.store_id = store.store_id) INNER JOIN item ON offer.item_id = item.item_id WHERE item.item_name LIKE 'Ο%';


SELECT item.item_name FROM (item INNER JOIN offer ON offer.item_id = item.item_id) INNER JOIN store ON store.store_id = offer.store_id WHERE store.store_name = 'Lidl'