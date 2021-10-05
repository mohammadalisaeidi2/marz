import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt' ;
import Student from '../models/students' ;
import validationError from '../Exceptions/validationError' ;
// import {studentLoginValidation, studentRegisterValidation} from "../middlewares/validation";


    export const studentLogin = async (req, res, next) => {
        try {
            console.log("-----studentLogin-----");
            console.log(req.body)
             Student.findOne({studentEmail: req.body.studentEmail}, ((error,student) => {
                error ? console.log(error) : student ? bcrypt.compare(req.body.studentPassword, student.studentHashedPassword, (error, result) => {
                    error ? console.log(error) : result ? jwt.sign({_id: student._id}, process.env.HASHED, {expiresIn: '20m'}, (error, token) => {
                        error ? console.log(error) : token ? res.status(200).send(token) : console.log(token)
                    }) : res.status(401).send(new validationError("ValidationError","Your username or password is not correct!",44,401,{pointer:req.path,parameter:'data.input'}))
                }) : res.status(401).send(new validationError("ValidationError","Your username or password is not correct!",44,401,{pointer:req.path,parameter:'data.input'}))
            }))
        } catch (e) {
            console.log(e)
        }
    }


    export const studentRegister = async (req, res, next) => {
        console.log("<__studentRegister__>");

        try {
            const {
                studentName,
                studentFamily,
                studentPassword,
                studentPhoneNumber,
                studentEmail,
                studentNationCode,
                studentAddress,
                studentAge,
                studentLevel,
            } = req.body;
            const HashedPassword = await bcrypt.hash(studentPassword, await bcrypt.genSalt(10));

            Student.create({
                studentName,
                studentFamily,
                studentPhoneNumber,
                studentPassword,
                studentHashedPassword:HashedPassword,
                studentEmail,
                studentNationCode,
                studentAddress,
                studentAge,
                studentLevel,
            }, (error) => {
                error ? next(error) : res.status(200).send("New Student registered !! ");
            })
        } catch (e) {
            next(e)
        }
    }