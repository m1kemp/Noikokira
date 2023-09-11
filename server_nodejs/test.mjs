import mysql from "mysql"
import express from "express";
import {sendQuery} from "./conHandler.mjs";
const app=express();
const con= mysql.createConnection({
    host:"localhost",
    user:"rootUser",
    password:"rootUser",
    database:"noikokira"
})
con.connect(function(error){
    if(error){
        console.log("Error"+error.stack);}
        else{
console.log("Connected")
        }
})
//let result1=sendQuery("select * from user");
//console.log(result1);

con.query("select * from user",(err,result,fields)=>{
    if (err){
        return console.log(err);
    }
    //else return console.log(result);
})

export {con}