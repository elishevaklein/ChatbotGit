
const mongoose=require('mongoose')//import the access to db

//the answer schema:
const answerSchema=mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    answerName:{type:String,required:true},
    answerDescription:{type:String,required:true},
    content:{}
  
})

module.exports=mongoose.model('answer',answerSchema)//export of schema