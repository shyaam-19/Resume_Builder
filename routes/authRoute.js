import express from 'express';
import { registerController,loginController } from '../controller/authController.js';
import { addResumeIdTOdb, deleteResume, getResumeDetails, getResumeIdArray, renameResume, upadateResumeDetails } from '../controller/resumeController.js';


const router = express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

router.post('/addresumeid',addResumeIdTOdb);

router.get('/addresumeid',getResumeIdArray);

router.get('/getresumedetails',getResumeDetails);

router.post('/updateresumedetails',upadateResumeDetails);

router.post('/renameresume',renameResume);

router.post('/deleteresume',deleteResume);

export default router;