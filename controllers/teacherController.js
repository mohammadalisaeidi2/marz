import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt' ;
import Admin from "../models/admins";
import {GridFsStorage} from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import TextLearn from "../models/textLearns";

const conn = mongoose.createConnection(process.env.DB_URL2, {useNewUrlParser: true, useUnifiedTopology: true});
let gfs;
conn.once('open', () => {
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})
const Teacher = require('../models/teachers');


export const teacherLogin = (req, res, next) => {
    try {
        console.log("-----AdminLogin-----");
        Teacher.findOne({teacherUsername: req.body.teacherUsername}, ((error, admin) => {
            error ? console.log(error) : admin ? bcrypt.compare(req.body.teacherPassword, admin.teacherHashedPassword, (error, result) => {
                error ? console.log(error) : result ? jwt.sign({_id: admin._id}, process.env.HASHED, {expiresIn: '20m'}, (error, token) => {
                    error ? console.log(error) : token ? res.header("auth-token", token).send(token) : console.log(token)
                }) : res.status(401).send("your username or password isn't correct")
            }) : res.status(401).send("you are not authorized!")
        }))
    } catch (e) {
        console.log(e)
    }
}
export const teacherGetCourses = (req, res, next) => {
    try {
        console.log("-----teacherCourses-----");
        gfs.files.find().toArray((error, files) => {
            if (!files && file.length === 0) {
                return res.status(404).send("no file exist")
            } else {
                return res.status(200).send(files)
            }
        })
    } catch (error) {
        next(error)
    }
}


export const teacherRegister = async (req, res, next) => {
    try {
        console.log("-----REGISTER-----");
        const {
            teacherName,
            teacherFamily,
            teacherPhoneNumber,
            teacherEmail,
            teacherNationCode,
            teacherPassword,
            teacherUsername,
            teacherAddress,
            teacherAge,
            teacherInfo,
            teacherCourseID,
        } = req.body
        const hash = await bcrypt.hash(teacherPassword, await bcrypt.genSalt(10))
        Teacher.create({
            teacherName,
            teacherFamily,
            teacherPhoneNumber,
            teacherEmail,
            teacherPassword,
            teacherHashedPassword: hash,
            teacherNationCode,
            teacherAddress,
            teacherUsername,
            teacherAge,
            teacherInfo,
            teacherCourseID,
        }, (error) => {
            error ? next(error) : res.status(200).send('ok')
        })
    } catch (e) {
        next(e)
    }
}



export const createTextLearn = async (req, res, next) => {
    try {
        console.log("-----NEW TEXT LEARN teacher -----");
        const {
            title,
            body,
            date
        } = req.body


        TextLearn.create({
            title,
            body,
            date

        }, (error) => {
            error ? next(error) : res.status(200).send('ok')
        })
    } catch (e) {
        next(e)
    }
}
