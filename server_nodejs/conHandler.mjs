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
        const nameArray = [];
        const catArray = [];

        for (var i = 0; i < prodArray.length; i++) {
            var name = prodArray[i].name;
            var category = prodArray[i].category;

            if (typeof name !== "undefined") {
                // Push values into the array for bulk insert
                nameArray.push([name]);
                catArray.push([category]);

            }
        }
        
        //TODO:Add a query for adding a category for the inserted items 
        //sendQuery()

        // Bulk insert using a single query
        if (nameArray.length > 0) {
            //const query = "INSERT INTO item (item_name) VALUES ?";
            for(var j = 0; j < nameArray.length; j++){
                const query ="CALL addProduct(?, ?)"
                con.query(query, [nameArray[j], catArray[j]], (err, result) => {
                    if (err) {
                        console.error(err);
                    } //else {
                        //console.log("Inserted rows: " + result.affectedRows);
                    //}
                });
            }
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


function genOffers(){
    let itemsResult = [];
    let userResult = [];
    let storeResult = [];

    const offerNum =200;     //Number of offers to be generated
    let randUser = [];
    let randItem = [];
    let randStore = [];
    
    let getRandItem = () => {
    return new Promise((res, rej) => {
    //Get item id's
    con.query("SELECT item_id FROM item", (err, result) => {
        if (err) {
            console.log("db error");
            console.error(err);
        } else {
            for(var i = 0; i < result.length; i++){
                itemsResult.push(result[i].item_id);
            }
            for(var i = 0; i<offerNum; i++){
                var itemNum = Math.floor(Math.random()*itemsResult.length);
                randItem.push(itemsResult[itemNum]);
                //console.log(itemsResult[itemNum]);
            }
            return res(result);
        }
    });
    });
    }

    let getRandUser = () => {
    return new Promise((res, rej) => {
    //Get user id's
    con.query("SELECT user_id FROM user", (err, result) => {
        if (err) {
            console.log("db error");
            console.error(err);
        } else {
            for(var i = 0; i < result.length; i++){
                userResult.push(result[i].user_id);
            }
            for(var i = 0; i<offerNum; i++){
                var usrNum = Math.floor(Math.random()*userResult.length);
                randUser.push(userResult[usrNum]);
                //console.log(userResult[usrNum]);
            }
            return res(result);
        }
    });
    });
    }

    let getRandStore = () => {
    return new Promise((res, rej) => {
    //Get store id's
    con.query("SELECT store_id FROM store", (err, result) => {
        if (err) {
            console.log("db error");
            console.error(err);
        } else {
            for(var i = 0; i < result.length; i++){
                storeResult.push(result[i].store_id);
            }
            for(var i = 0; i<offerNum; i++){
                var storeNum = Math.floor(Math.random()*storeResult.length);
                randStore.push(storeResult[storeNum]);
                //console.log(storeResult[storeNum]);
            }
            return res(result);
        }
    });
    });
    };

    async function pushRand(){
    const itemP = getRandItem();
    const userP = getRandUser();
    const storeP = getRandStore();

    const promises = [itemP, userP, storeP];
    await Promise.all(promises);
    const values = [];
    for(var i = 0; i < offerNum; i++){
        values.push([0, 0, randItem[i], randStore[i], randUser[i]])
    }
    //Push the random offers to the database
    const query = "INSERT INTO offer (likes, dislikes, item_id, store_id, user_id) VALUES ?";
    con.query(query, [values], (err, result) => {
        if (err) {
            console.log("db error");
            console.error(err);
        } else {
            console.log("Added offers: " + result.affectedRows);
        }
    });
    }
    pushRand();



}


function genUsers(){
    var userNum = 10;
    let userList = [];

    for(var i = 0; i < userNum; i++){
        userList.push(["testUser" + i, "testUser" + i, "testUser" + i])
    }
    for(var j = 0; j<userNum; j++){
        const query = "CALL createUser(?)";
        con.query(query, [userList[j]], (err, result) => {
            if (err) {
                console.log("db error");
                console.error(err);
            }
        });
    }
    console.log("Added users: " + userNum);

}

let searchSuper = (term) => {
return new Promise((res, rej) => {
//async function searchSuper(term){
    term = term+"%";
    const query = "SELECT store_name, store_lat, store_lon FROM store WHERE store_name LIKE ?";
    con.query(query, [term], (err, result) => {
        if (err) {
            console.log("db error");
            console.error(err);
        } else{
            //console.log("Results: ", res);
            res(result);
        }
    });

});
}

let searchProd = (term) => {
    return new Promise((res, rej) => {
        term = term+"%";
        const query = "SELECT store.store_name, store.store_lat, store_lon, item.item_name FROM (store INNER JOIN offer ON offer.store_id = store.store_id) INNER JOIN item ON offer.item_id = item.item_id WHERE item.item_name LIKE ?";
        con.query(query, [term], (err, result) => {
            if (err) {
                console.log("db error");
                console.error(err);
            } else{
                //console.log("Results: ", res);
                res(result);
            }
        });
    
    });
    }

let searchOffer = (sName, lat, lon)=> {
    return new Promise((res, rej) => {
        const query = "SELECT item.item_name FROM (item INNER JOIN offer ON offer.item_id = item.item_id) INNER JOIN store ON store.store_id = offer.store_id WHERE store.store_name = ? AND store.store_lat = ? AND store.store_lon = ?";
        con.query(query, [sName, lat, lon], (err, result) => {
            if (err) {
                console.log("db error");
                console.error(err);
            } else{
                res(result);
            }
        });
    });
}

export { sendQuery, updateSupermarkets,removeSupermarkets, updateProducts, removeProducts, genOffers, searchSuper, searchProd, genUsers, searchOffer };