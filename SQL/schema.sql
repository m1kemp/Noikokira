DROP SCHEMA IF EXISTS noikokira;
CREATE SCHEMA noikokira;
USE noikokira;

CREATE TABLE user(
    user_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL ,
    email VARCHAR(45) NOT NULL ,
    password VARCHAR(64) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE admin(
    admin_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(45)NOT NULL,
    password VARCHAR(64) NOT NULL,
    PRIMARY KEY(admin_id)
);