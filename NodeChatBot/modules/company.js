const mongoose=require('mongoose')//import the access to db

//the question schema:
const companySchema=mongoose.Schema({
    companyId:mongoose.Schema.Types.ObjectId,
    companyName:{type:String,required:true},
    companyDescription:{type:String,required:true},
    chatbotOpeningMessage:{type:String,required:true},
    optionsOfCompany:[{type:mongoose.Schema.Types.ObjectId,ref:'answer'}]
    // companyLogo:{ type:String,required:true}
})

module.exports=mongoose.model('company',companySchema)//export of schema