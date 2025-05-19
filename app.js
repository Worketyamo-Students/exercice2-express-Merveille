import router from "./routes/bookRoutes.js"
import express from "express"
import  bodyParser from "body-parser"
import fs from"fs"

const app =express();

app.use(bodyParser.json());
app.use("/",router)

app.listen(5000,(err) =>{
    if(err) throw err
    console.log("le server tourne a l'adresse http://local:5000")
})


