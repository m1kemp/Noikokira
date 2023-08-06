import express from "express";
import {engine} from "express-handlebars";
import session from "express-session";
import createMemoryStore from "memorystore";
import {router} from "./router.mjs"

import fileUpload from "express-fileupload";
import cors from "cors"
import bodyParser from "body-parser";
import morgan from "morgan";
import _ from "lodash";




const MemoryStore=createMemoryStore(session)



const app=express()

app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const mySession= session (
{
    secret: process.env.SESSION_SECRET || "bc7ffa23456mmmvl",
    store: new MemoryStore({checkPeriod: 8640*1000}),
    resave: false,
    saveUninitialized: false ,
    name:"bucket-sid",
    cookie:{
        maxAge: 1000*60*20
    }
})


app.use(mySession)
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static("public"))
app.engine(".hbs",engine({extname:".hbs"}));
app.set("view engine",".hbs");

app.use("/",router)

app.use((req,res)=>
{
    res.redirect("/");
})

app.listen(3000,()=>console.log("Start app"))

