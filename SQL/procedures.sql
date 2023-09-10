USE noikokira;

#Updates the credentials of the user with the given id. If a user with the same email exists then it returns -1
DROP PROCEDURE IF EXISTS updateUser;
DELIMITER $
CREATE PROCEDURE updateUser(IN usrID SMALLINT UNSIGNED, IN newEmail VARCHAR(45), IN newUsername VARCHAR(45), IN newPassword VARCHAR(64))
BEGIN
    SELECT COUNT(*) INTO @userNum FROM user WHERE username=newUsername AND user_id!=usrID;
    IF @userNum = 0 THEN
        UPDATE user SET user.username=newUsername, user.password=newPassword, user.email=newEmail WHERE user_id=usrID;
    ELSE
        SELECT -1;
    end if;
END $
DELIMITER ;


#Create a user by checking if the same email already exists in the database. If a user with the given email exists it returns -1
DROP PROCEDURE IF EXISTS createUser;
DELIMITER $
CREATE PROCEDURE createUser(IN newEmail VARCHAR(45), IN newUsername VARCHAR(45), IN newPassword VARCHAR(64))
BEGIN
    SELECT COUNT(*) INTO @userNum FROM user WHERE username=newUsername;
    IF @userNum = 0 THEN
        INSERT INTO user (username, email, password, points, tokens) VALUES(newUsername, newEmail, newPassword, 0, 0);
    ELSE
        SELECT -1;
    end if;
END $
DELIMITER ;



DROP PROCEDURE IF EXISTS addOffer;
DELIMITER $
CREATE PROCEDURE addOffer()
BEGIN

END $
DELIMITER ;


DROP PROCEDURE IF EXISTS addProduct;
DELIMITER $
CREATE PROCEDURE addProduct(IN productName VARCHAR(50), IN categoryName VARCHAR(50))
BEGIN
    SELECT COUNT(*) INTO @catNum FROM item_category where category_name=categoryName;
    IF @catNum = 0 THEN
        INSERT INTO item_category (category_name) VALUES(categoryName);
    END IF;

    SELECT category_id INTO @catID FROM item_category WHERE category_name=categoryName;

    INSERT INTO item (category_id, item_name) VALUES(@catID, productName);

END $
DELIMITER ;


DROP PROCEDURE IF EXISTS deleteProduct;
DELIMITER $
CREATE PROCEDURE deleteProduct(IN productName VARCHAR(50))
BEGIN
    DELETE FROM item WHERE item_name=productName;
END $
DELIMITER ;



#Make procedures Search Store by name, Search offer by product name, Search offer by store,
#Use the given category names.