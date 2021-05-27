const mongoose=require('mongoose')
const request=require('request')
const http = require('http')
const path = require('path')
const express = require('express')
const Answer=require('../modules/answer')
const Company=require('../modules/company')


const addNewCompany=(req,res)=>{//promise function
      //  console.log(req.body);
       const currentCompany= new Company(req.body)
       currentCompany.save().then(()=>{
         res.status(200).json({
             massege:"company created",
             myCompany:currentCompany
         })
       }).catch((error)=>{
          res.status(400).send(error.massege)
       })
    }


     const upDateCompany=async(req,res)=>{
      const companyId=req.params.companyId
      console.log("companyId:",companyId)
      try{
   
        const currentCompany=await Company.findByIdAndUpdate(companyId,
          {
          "companyName":req.body.companyName,
          "companyDescription":req.body.companyDescription,
          "chatbotOpeningMessage":req.body.chatbotOpeningMessage,
          "optionsOfCompany":[]},
          {new:true})
       await currentCompany.save()
       console.log(currentCompany)
      res.status(200).json({myUpDateCompany:currentCompany});
    }  catch (error){
       res.status(400).send(error.massege); 

  }
}
        


   //    const deleteCompany= async(req,res)=>{
   //    try{
   //      const companyId=req.params.companyId
   //      const allAnswersOfCompany  =  Answer.find(companyId)
   //    if(allAnswersofCompany==null){
   //      await Company.findByIdAndDelete(companyId)
   //      res.status(200).send('compny delete');         
   //    }
   //    // else{
   //    //    res.status(200).send('compny delete');  
   //    // }
   //    }catch(error){
   //       res.status(400).send(error.massege);    
   //    }
   // }
   

    const getCompanyById=async(req,res)=>{
         const companyId=req.params.companyId
         // console.log(companyId)
         try {
           const company=await Company.findById(companyId)
               res.status(200).json({myCompany:company})
         }catch{
            res.status(400).send(error,'error');
         }
      }

   const chatbotOpeningMessage= async(req,res)=>{
      const companyId=req.params.companyId
     //  console.log(companyId)
      try {
        const company=await Company.findById(companyId)
         res.status(200).json({theChatbotOpeningMessage:company.chatbotOpeningMessage});
      }catch{
         res.status(400).send('error');
      }
    }



module.exports={addNewCompany,upDateCompany,getCompanyById,chatbotOpeningMessage}
// ,deleteCompany