#! /bin/bash
## Define error code
E_NOTROOT=87 # Non-root exit error.

## check if is sudoer
if ! $(sudo -l &> /dev/null); then
    echo 'Error: root privileges are needed to run this script'
    exit $E_NOTROOT
fi
##Do sudo commands
clear
mysqlActive=$(sudo systemctl is-active mysql)
echo MySQL Service is: $mysqlActive
if [ $mysqlActive != "active" ]
then
    echo Activating MySQL Service...
    sudo systemctl start mysql
fi

##Full privilaged user creation
echo Creating user: remoteUser with password: remoteUser...
sudo mysql -e "CREATE USER 'remoteUser'@'localhost' IDENTIFIED BY 'remoteUser'" &> /dev/null
sudo mysql -e "ALTER USER 'remoteUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'remoteUser'"
sudo mysql -e "GRANT ALL PRIVILEGES ON * . * TO 'remoteUser'@'localhost'"


echo Schema setup...
sudo mysql < SQL/schema.sql

echo Procedure setup...
sudo mysql < SQL/procedures.sql

echo Inserting values from insert.sql
sudo mysql < SQL/insert.sql

echo Starting the node server...
cd server_nodejs
xterm -e node node.mjs &
cd ..
sleep 1
firefox -new-window http://localhost:3000 &

read -p "Press enter to stop the server, drop Schema: noikokira and stop mysql service..." </dev/tty

xtermPid=$(pgrep --newest xterm)
sudo kill -9 $xtermPid &> /dev/null 
sudo mysql -e "DROP SCHEMA IF EXISTS noikokira"
sudo systemctl stop mysql > /dev/null

echo All done. Goodbye!

exit 0