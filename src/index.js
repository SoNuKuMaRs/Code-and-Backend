// require('dotenv').config({path: './env'})
// import mongoose  from "mongoose";
// import {DB_NAME} from "./constants"

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: './env'
})

connectDB()
.then( () => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`server is runing at port : ${process.env.PORT}`);
    })
    // app.on("erroe", (error) => {
    //     console.log("ERROE", error);
    //     throw error
    // })
})
.catch( () => {
    console.log("MONGO  db connection failed !!!", err);
})




/*
import express from "express"
const app = express()


( async () => {
    try {
       await mongoose.connect(`${process.env.
        MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("ERROR:", error);
            throw error
        })
        
        app.listen(process.env.PORT, () => {
            console.log(`app is listening on port $
        {process.env.PORT}`);
        })

    } catch (error) {
        console.log("ERROR", error)
        throw error
    }
}) ()    */