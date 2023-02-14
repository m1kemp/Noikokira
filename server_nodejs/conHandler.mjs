import mysql from "mysql"
import {con} from "./test.mjs"


 function sendQuery(querySend){
     con.query(querySend,(err,result,fields)=>{
        if (err){
            return console.log(err);
        }
        else return result;
    })
 }

 export{sendQuery}