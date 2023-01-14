import mysql from "mysql"
import express from "express";

const app=express();
const con= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mixalhsmpallas2001",
    database:"bucket"
})
con.connect(function(error){
    if(error){
        console.log("Error"+error.stack);}
        else{
console.log("Connected")
        }
})

con.query("select * from user",(err,result,fields)=>{
    if (err){
        return console.log(err);
    }
    else return console.log(result);
})

export {con}