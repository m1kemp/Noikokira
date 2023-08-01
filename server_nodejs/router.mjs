import express from "express"
import mysql from "mysql"
import {con} from "./test.mjs"
const router=express.Router()


router.get("/",(req,res)=>{
    res.render("admin_user")
})

router.get("/login_admin",(req,res)=>{
    res.render("login_admin")
})
router.post("/homepage_admin",(req,res)=>{
    const {username,password}=req.body;
    con.query("SELECT username,password from admin WHERE username=? and password=?",
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
        })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  })

export{router}




