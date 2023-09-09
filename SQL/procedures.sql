USE noikokira;

#Updates the credentials of the user with the given id. If a user with the same email exists then it returns -1
DROP PROCEDURE IF EXISTS updateUser;
DELIMITER $
CREATE PROCEDURE updateUser(IN usrID SMALLINT UNSIGNED, IN newEmail VARCHAR(45), IN newUsername VARCHAR(45), IN newPassword VARCHAR(64))
BEGIN
    SELECT COUNT(*) INTO @userNum FROM user WHERE email=newEmail AND user_id!=usrID;
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
    SELECT COUNT(*) INTO @userNum FROM user WHERE email=newEmail;
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

#Make procedures Search Store by name, Search offer by product name, Search offer by store,
#Use the given category names.