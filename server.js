import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
import userRouter from "./server/routes/userRoute";
import SessionRouter from "./server/routes/sessionRoutes";

import bodyParser from "body-parser";


dotenv.config({path:"./.env"});

const app = express();
app.use(bodyParser.json());

app.use("/FREEMentor/vl/user", userRouter);
app.use("/FREEMentor/vl/session", SessionRouter);
app.use('/',(req, res)=>{
    res.status(200).send({
        status:200,
        message: "this is Freementor APIs"
    })
})


const databaseurl = process.env.DATABASE;

mongoose.connect(databaseurl,{useNewUrlParser: true, useCreateIndex: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify:false}).then(()=>console.log('Database connected successfully'));

const port= process.env.PORT;
app.listen(port, ()=>{
    console.log(databaseurl);
    console.log(`server is running on port ${port}`);
})
export default app;