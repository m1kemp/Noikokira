import express from "express"
import mysql from "mysql"
import {con} from "./test.mjs"
import {sendQuery, updateSupermarkets, removeSupermarkets, updateProducts, removeProducts, genOffers, searchSuper, searchProd, genUsers, searchOffer} from "./conHandler.mjs"

import fileUpload from "express-fileupload";
import cors from "cors"
import bodyParser from "body-parser";
import morgan from "morgan";
import _ from "lodash";

const router=express.Router()



//User class
class User{
  constructor(email, username, password){
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

//Create a logged user object
const loggedUser = new User("blank", "blank", "blank");

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


router.post("/updateUser",(req,res)=>{
  //Make code to update user
  res.render("maps",{username:loggedUser.username})
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
loggedUser.username = username;
loggedUser.password = password;
con.query("SELECT username,password,email from user WHERE username=? and password=?",
[username,password],(error,result)=>{
    if(error){
        console.log(error);
    }
    else if(result.length>0){
      loggedUser.email = result[0].email;
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

  res.json({message: [loggedUser.email, loggedUser.username, loggedUser.password]});
    
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


router.post("/offer/generate", async(req, res)=>{

  genOffers();
    
});

router.post("/database/search", async (req, res) => {
  const term = req.body.term;
  const type = req.body.type;
  const sName = req.body.sName;
  const lat = req.body.lat;
  const lon = req.body.lon;
  if(type == "super"){//Search supermarket
    const superP = searchSuper(term);
    await Promise.all([superP]).then((rez)=>{
      res.json({message: rez});
    });
  }
  else if(type == "prod"){
    //search products
    const prodP = searchProd(term);
    await Promise.all([prodP]).then((rez)=>{
      res.json({message: rez});
    });
  }
  else if(type == "offer"){
    //search offers by supermarket
    const offerP = searchOffer(sName, lat, lon);
    await Promise.all([offerP]).then((rez)=>{
      res.json({message: rez});
    })
  }

 
});

router.post("/user/generate", async (req, res) => {
  genUsers();
 
});

router.get("/admin/viewScore", (req,res)=>  {
  let username=[];
  con.query("SELECT username,points,tokens from user  order by points limit 10",
(error,result)=>{
    if(error){
        console.log(error);
    }
    else if(result.length>0){
      
     
      console.log(result);}
      return res.render("viewScore",{usersData:result});
    
   
    })


});

router.get("/product/detail",(req,res)=>{

  const itemName = req.query.itemName;
  const price=req.query.price;
  res.render("productDetails",{itemName:itemName,price:price});
  })

router.get("/offer/create",(req,res)=>  {
  res.render("createOffer");
});

export{router}




