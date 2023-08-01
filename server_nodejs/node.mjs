import express from "express";
import {engine} from "express-handlebars";
import session from "express-session";
import createMemoryStore from "memorystore";
import {router} from "./router.mjs"

const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const MemoryStore=createMemoryStore(session)

app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const app=express()
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

