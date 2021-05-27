const mongoose = require("mongoose");
const request = require("request");
const http = require("http");
const path = require("path");
const express = require("express");
const Answer = require("../modules/answer");
const Company = require("../modules/company");

const addAnswerToCompany = async (req, res) => { 
  try {
    const company = await Company.findById(req.params.companyId);
    // console.log(req.params.companyId)
    const answer = new Answer({
      answerName: req.body.answerName,
      answerDescription: req.body.answerDescription,
      companyId: req.params.companyId
    });
    await answer.save();
    console.log(answer);
    await company.optionsOfCompany.push(answer);
    await company.save();
    res.status(200).json({theNewCompanyAnswer:answer});
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const upDateAnswer=async(req,res)=>{
    try{
       const answerId=req.params.answerId
      //  console.log("upDateAnswer:",answerId)
       const answer=await Answer.findByIdAndUpdate(answerId,
          {
          "answerName":req.body.answerName,
          "answerDescription":req.body.answerDescription },
          {new:true})
          answer.save()
       console.log(answer)
      res.status(200).json({myUpDateAnswer:answer});
    }  catch (error){
       res.status(400).send(error,'error');
    }
  }



 const getAllOptionsOfCompany=async(req,res)=>{
   try{
          const company=await Company.findById(req.params.companyId)
           .populate(  'optionsOfCompany' );
           res.status(200).json({
            options: company.optionsOfCompany })
            console.log(optionsOfCompany)
      }catch(error){
       res.status(404).send(error.message)
      }
    }
        

module.exports = { addAnswerToCompany,getAllOptionsOfCompany,upDateAnswer };

