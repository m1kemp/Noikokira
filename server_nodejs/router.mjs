import express from "express"
import mysql from "mysql"
import {con} from "./test.mjs"
import {sendQuery, updateSupermarkets, removeSupermarkets, updateProducts, removeProducts} from "./conHandler.mjs"

import fileUpload from "express-fileupload";
import cors from "cors"
import bodyParser from "body-parser";
import morgan from "morgan";
import _ from "lodash";

const router=express.Router()

var usernameglobal=0;
router.get("/",(req,res)=>{
    res.render("admin_user")
})

router.get("/login_admin",(req,res)=>{
    res.render("login_admin")
})
router.post("/homepage_admin",(req,res)=>{
    const {username,password}=req.body;
    con.query("SELECT username from admin WHERE username=? and password=?",
    [username,password],(error,result)=>{
        if(error){
            console.log(error);
        }
        else if(result.length>0){
    
    return res.render("homepage_admin",{username:username})
        }
        else{
            res.render("login_admin",{message:"The account does not exist"})
        }
        })
        })

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/profUserChange",(req,res)=>{
  res.render("profUserChange");
})

router.post("/editProfile",(req,res)=>{
  const{username,password}=req.body;
con.query("SELECT email FROM user WHERE password=? and username=?",[password,username],(error,result)=>{
  if(error){
    console.log(error);
  }
  else if(result.length==0){
    return res.render("validation",{message:"Wrong information"})
  }
  else{
    const email=result[0].email;
    res.render("profUserChange",{username:username,password:password,email:email})
  }
})
})
router.post("/editedHomepage",(req,res)=>{
  res.render("profUserChange",{username:username,password:password,email:email})
  const {username,email,password,oldUsername,oldEmail,oldPassword}=req.body;

  console.log(oldUsername);
  con.query("UPDATE user SET username=?,email=?,password=? WHERE username=? and email=?",[username,email,password,oldUsername,oldEmail])
  res.render("maps",{username:username})

})

router.post("/signedup",(req,res)=>{ 
 const {username,email,password}=req.body;
  con.query("SELECT email FROM user WHERE email=?",[email],(error,result)=>{
    if(error){
        console.log(error);
    }
 else if(result.length>0){
   return res.render("signup",{message:"Email already exists"})
  }
  else{
    res.render("login",{username:username})
    con.query("INSERT INTO USER SET ?",{username:username,email:email,password:password,points:0,tokens:0})
     }
 })
})

router.get("/signup",(req,res)=>
{
    res.render("signup")   
})


router.post("/homepage",(req,res)=>{
const {username,password}=req.body;
usernameglobal=username;
con.query("SELECT username,password from user WHERE username=? and password=?",
[username,password],(error,result)=>{
    if(error){
        console.log(error);
    }
    else if(result.length>0){

return res.render("maps",{username:username})
    }
    else{
        res.render("login",{message:"The account does not exist"})
    }
    })
    })





router.get("/logout",(req,res)=>{
req.session.destroy();
res.redirect("/")
})
router.post('/upload', async (req, res) => {
    try {
      if (!req.files) {
        console.log("Failed");
        res.send({
          status: false,
          message: 'No file uploaded'
        })
      } else {
        // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let jsonFile = req.files.file
  
        // Use the mv() method to place the file in the upload directory (i.e. "uploads")
        jsonFile.mv('./uploads/' + jsonFile.name)
  
        //send response
        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            name: jsonFile.name,
            mimetype: jsonFile.mimetype,
            size: jsonFile.size
          }
        });

        //Read uploaded json
        //updateSupermarkets(jsonFile.name);
      }
    } catch (err) {
      res.status(500).send(err)
    }
  })

router.post("/database/update", async (req, res) => {
  try{
    if(req.body.type == "addSuper"){
      updateSupermarkets(req.body.fileName)
    }
    if(req.body.type == "deleteSuper"){
      removeSupermarkets(req.body.fileName)
    }
    if(req.body.type == "addProd"){
      updateProducts(req.body.fileName)
    }
    if(req.body.type == "deleteProd"){
      removeProducts(req.body.fileName)
    }


    res.send({
      status: true,
      message: 'Database updated'
    });

  }catch(err){
    res.status(500).send(err)
  }
});


router.post("/user/credentials", async(req, res)=>{
  res.json({message: usernameglobal});
});

router.post("/database/get", async (req, res) => {
  try{
    //Fetch supermarkets
    if(req.body.type == "super"){
      let formData = new FormData();

      var data;

      const query = "select * from store;";

      con.query(query, (err, result) => {
        if (err) {
            console.error(err);
        } else {
          //Send the data to frontend
          res.json({message: result});
        }
    });
    }

    //Fetch products
    if(req.body.type == "prod"){

    }
  }
  catch(err){
    res.status(500).send(err)
  }
})

export{router}




