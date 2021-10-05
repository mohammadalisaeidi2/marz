import express from 'express';
import {teacherLogin, teacherRegister, teacherGetCourses,createTextLearn} from '../controllers/teacherController.js';
import {teacherLoginValidation, teacherRegisterValidation,teacherTextLearnValidation} from '../middlewares/validation.js';
import {teacherLoginSanitization, teacherRegisterSanitization} from "../middlewares/sanitization";
import {GridFsStorage} from "multer-gridfs-storage";
import crypto from "crypto";
import authorization from "../middlewares/authorization";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post('/teacher/register', [teacherRegisterSanitization, teacherRegisterValidation], teacherRegister);
router.post('/teacher/login', [teacherLoginSanitization, teacherLoginValidation], teacherLogin);
router.post('/teacher/newtextlearn',[teacherTextLearnValidation],createTextLearn);
try {

//create storage engine
    const storage = new GridFsStorage({
        url: process.env.DB_URL2,
        options: {useUnifiedTopology: true},
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (error) {
                        return reject(error);
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'uploads'
                    };
                    resolve(fileInfo);
                });
            });
        }
    });
    const upload = multer({storage});
    router.post('/teacher/upload', [authorization, upload.single('file')], (req, res, next) => {
        console.log("-----teacherFileUpload-----");
        res.json({file: req.file});
    })
    router.post('/teacher/courses',[authorization],teacherGetCourses)
} catch (error) {
    console.log(error);
}

export default router;