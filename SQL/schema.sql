DROP SCHEMA IF EXISTS noikokira;
CREATE SCHEMA noikokira;
USE noikokira;


CREATE TABLE address(
    address_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    address_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (address_id)
);

CREATE TABLE user(
    user_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL ,
    password VARCHAR(64) NOT NULL,
    points SMALLINT NOT NULL ,
    tokens SMALLINT NOT NULL ,
    PRIMARY KEY (user_id)
);

CREATE TABLE admin(
    admin_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(45)NOT NULL,
    password VARCHAR(64) NOT NULL,
    PRIMARY KEY(admin_id)
);


CREATE TABLE item_category(
    category_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (category_id)
);

CREATE TABLE item(
    item_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_id SMALLINT UNSIGNED NOT NULL,
    item_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (item_id, category_id),
    CONSTRAINT fk_item_item_category FOREIGN KEY (category_id) REFERENCES item_category(category_id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE store(
    store_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    store_name VARCHAR(20) NOT NULL,
    PRIMARY KEY(store_id)
);

CREATE TABLE store_inventory(
    inventory_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    store_id MEDIUMINT UNSIGNED NOT NULL,
    item_id MEDIUMINT UNSIGNED NOT NULL,
    PRIMARY KEY (inventory_id)
    #TODO: Add foreign key constraint to store_id ans item_id
);