import mysql from "mysql"
import {con} from "./test.mjs"
import fs from "fs"

 function sendQuery(querySend){
     con.query(querySend,(err,result,fields)=>{
        if (err){
            return console.log(err);
        }
        else return result;
    })
 }



function updateSupermarkets(fileName) {
    var filePath = "./uploads/" + fileName;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        var supermarketData = JSON.parse(data);
        var superArray = supermarketData.elements;
        
        // Prepare an array to hold values for bulk insert
        const valuesArray = [];

        for (var i = 0; i < superArray.length; i++) {
            var name = superArray[i].tags.name;
            var lat = superArray[i].lat;
            var lon = superArray[i].lon;

            if (typeof name !== "undefined") {
                // Push values into the array for bulk insert
                valuesArray.push([name, lat, lon]);
            }
        }

        // Bulk insert using a single query
        if (valuesArray.length > 0) {
            const query = "INSERT INTO STORE (store_name, store_lat, store_lon) VALUES ?";
            con.query(query, [valuesArray], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Inserted rows: " + result.affectedRows);
                }
            });
        }
    });
}

function removeSupermarkets(fileName) {
    var filePath = "./uploads/" + fileName;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        var supermarketData = JSON.parse(data);
        var superArray = supermarketData.elements;
        
        // Prepare an array to hold values for bulk insert
        const valuesArray = [];

        for (var i = 0; i < superArray.length; i++) {
            var name = superArray[i].tags.name;
            var lat = superArray[i].lat;
            var lon = superArray[i].lon;

            if (typeof name !== "undefined") {
                // Push values into the array for bulk insert
                valuesArray.push([name, lat, lon]);
            }
        }

        // Bulk insert using a single query
        if (valuesArray.length > 0) {
            const query = "DELETE FROM STORE WHERE (store_name,store_lat, store_lon) IN (?)";
            con.query(query, [valuesArray], (err, result) => {
                if (err) {
                    console.log("db error");
                    console.error(err);
                } else {
                    console.log("Deleted rows: " + result.affectedRows);
                }
            });
        }
    });
}

function updateProducts(fileName) {
    var filePath = "./uploads/" + fileName;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        var prodData = JSON.parse(data);
        var prodArray = prodData.products;
        
        // Prepare an array to hold values for bulk insert
        const valuesArray = [];

        for (var i = 0; i < prodArray.length; i++) {
            var name = prodArray[i].name;

            if (typeof name !== "undefined") {
                // Push values into the array for bulk insert
                valuesArray.push([name]);
            }
        }
        
        //TODO:Add a query for adding a category for the inserted items 
        //sendQuery()

        // Bulk insert using a single query
        if (valuesArray.length > 0) {
            const query = "INSERT INTO item (item_name) VALUES ?";
            con.query(query, [valuesArray], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Inserted rows: " + result.affectedRows);
                }
            });
        }
    });
}

function removeProducts(fileName) {
    var filePath = "./uploads/" + fileName;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        var prodData = JSON.parse(data);
        var prodArray = prodData.products;
        
        // Prepare an array to hold values for bulk insert
        const valuesArray = [];

        for (var i = 0; i < prodArray.length; i++) {
            var name = prodArray[i].name;

            if (typeof name !== "undefined") {
                // Push values into the array for bulk insert
                valuesArray.push([name]);
            }
        }

        // Bulk insert using a single query
        if (valuesArray.length > 0) {
            const query = "DELETE FROM item WHERE (item_name) IN ?";
            con.query(query, [valuesArray], (err, result) => {
                if (err) {
                    console.log("db error");
                    console.error(err);
                } else {
                    console.log("Deleted rows: " + result.affectedRows);
                }
            });
        }
    });
}
export { sendQuery, updateSupermarkets,removeSupermarkets, updateProducts, removeProducts };