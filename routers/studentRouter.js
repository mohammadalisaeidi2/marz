import express from 'express';
import {studentLogin, studentRegister} from '../controllers/studentController';
import {studentLoginValidation, studentRegisterValidation} from '../middlewares/validation' ;
import { studentRegisterSanitization} from "../middlewares/sanitization";

const router = express.Router();

router.post('/student/login', [ studentLoginValidation], studentLogin);


router.post('/student/register', [studentRegisterSanitization, studentRegisterValidation], studentRegister);


export default router;