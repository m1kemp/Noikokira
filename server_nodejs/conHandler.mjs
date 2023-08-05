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

 function updateSupermarkets(fileName){
    //File must me located in ./uploads
    var filePath = "./uploads/" + fileName;
    var query = "INSERT INTO store (store_name) VALUES "

    //Read the json file and organise contents in the superArray
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        var supermarketData = JSON.parse(data);
        var superArray = supermarketData.elements
        for (var i = 0; i < superArray.length; i++){
            var name = superArray[i].tags.name;
            if(typeof(name) != "undefined"){
                //console.log(name);
                //Add the supermarket names to the query
                query += "('";
                query += name;
                query += "')";
                query += ", ";
            }

        }
        //Complete query
        query = query.slice(0, -2);
        query += ";";
        console.log(query);

        //Send query
        sendQuery(query, err, (err,result,fields)=>{
            if (err){
                return console.log(err);
            }
            else return console.log(result);
        });

    });



 }

 export{sendQuery}
 export {updateSupermarkets}