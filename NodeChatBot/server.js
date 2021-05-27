const express=require('express')
const mongoose=require('mongoose')
const socket=require('socket.io')
const claudia_bot_builder=require('claudia-bot-builder')
const body_parser=require('body-parser')
var botBuilder = require('claudia-bot-builder');
const path=require('path');
const request=require("request")
const jwt=require('jsonwebtoken');
const files=require('fs');
const dotenv=require('dotenv')
const app= express()
const port=4000
dotenv.config()
const router=require('./routs/api');
app.use(body_parser.json())
app.use('/',router)

// module.exports = botBuilder(function (request) {
//   return 'Thanks for sending ' + request.text;
// });


const connectionParams={
    newUrlParser:true,
    useCreateIndex:true,
    // useUnifiedTopology:true,
    useFindAndModify:false
    
    }

mongoose.connect(process.env.DB_CONNECT, connectionParams).then(()=>{
    console.log("success")
}).catch((error)=>{
    console.log(error,"not suuccess!!!")
});



app.listen(port,function(){
    console.log("listening to reqests")
    })

