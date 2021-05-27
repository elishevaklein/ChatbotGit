const router=require('express').Router();
const answerController=require('../controllers/answerController')
const companyController=require('../controllers/companyController')

router.post('/addNewCompany',companyController.addNewCompany)
router.post('/upDateCompany/:companyId',companyController.upDateCompany)
// router.delete('/deleteCompany/:companyId',companyController.deleteCompany)
router.get('/getCompanyById/:companyId',companyController.getCompanyById)
router.get('/openChatBot/:companyId',companyController.chatbotOpeningMessage)
router.post('/addAnswerToCompany/:companyId',answerController.addAnswerToCompany)
router.get('/getAllOptionsOfCompany/:companyId',answerController.getAllOptionsOfCompany)
router.post('/upDateAnswer/:answerId',answerController.upDateAnswer)
// router.post('/addNewAnswerToQuestion/:answerToquestionId',answerController.addNewAnswerToQuestion)
// router.get('/getAnswersOfCompany:/companyId',answerController.getAnswersOfCompany)



module.exports=router