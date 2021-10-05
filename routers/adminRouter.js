import express from 'express';
import {adminLogin, adminRegister, adminUpload,createTextLearn,getTextLearn,createSlideShow,getSlideShow,createCollaboration,getCollaboraton} from '../controllers/adminController';
import {adminLoginValidation, adminTextLearnValidation,slideShowValidation,collaborationValidation} from "../middlewares/validation";
import {adminLoginSanitization} from "../middlewares/sanitization";
import authorization from "../middlewares/authorization";
import JoiError from "../Exceptions/validationError";
import {GridFsStorage} from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const router = new express.Router();
try {
    router.post('/admin/login', [adminLoginSanitization, adminLoginValidation], adminLogin);
    router.post('/admin/register', [authorization], adminRegister);
    router.post('/admin/newtextlearn',[adminTextLearnValidation],createTextLearn);
    router.post('/admin/gettextlearn',[],getTextLearn);
    router.post('/admin/newslideshow',[slideShowValidation],createSlideShow);
    router.post('/admin/getslideshow',[],getSlideShow);
    router.post('/admin/newcollaboration',[collaborationValidation],createCollaboration);
    router.post('/admin/getcollaboration',[],getCollaboraton);


//create storage engine
    const storage = new GridFsStorage({
        url: process.env.DB_URL2,
        options: {useUnifiedTopology: true},
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
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
    router.post('/admin/upload', [authorization,upload.single('file')], (req, res, next) => {
        console.log("-----adminFileUpload-----");
        res.json({file: req.file});
    })
} catch (error) {
    console.log(error)
}
export default router;
