DROP SCHEMA IF EXISTS noikokira;
CREATE SCHEMA noikokira;
USE noikokira;


CREATE TABLE user(
    user_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL ,
    email VARCHAR(45) NOT NULL ,
    points SMALLINT NOT NULL ,
    tokens SMALLINT NOT NULL ,
    password VARCHAR(64) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE admin(
    admin_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(45)NOT NULL,
    password VARCHAR(64) NOT NULL,
    PRIMARY KEY(admin_id)
);


CREATE TABLE item_category(
    category_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (category_id)
);

CREATE TABLE item(
    item_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_id SMALLINT UNSIGNED NOT NULL,
    item_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (item_id, category_id),
    CONSTRAINT fk_item_item_category FOREIGN KEY (category_id) REFERENCES item_category(category_id) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE offer(
    offer_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    likes SMALLINT NOT NULL,
    dislikes SMALLINT NOT NULL,
    item_id SMALLINT UNSIGNED NOT NULL,
    user_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY(offer_id),
    CONSTRAINT fk_offer_item FOREIGN KEY (item_id) REFERENCES item(item_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_offer_user FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE RESTRICT ON UPDATE RESTRICT #Offer cant be transfered!
)