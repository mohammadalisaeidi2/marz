import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler";
import {studentRouter, adminRouter, teacherRouter} from "./routers";
import cors from "cors";
import useragent from "express-useragent";
import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import crypto from 'crypto';
import path from 'path';
import methodOverride from 'method-override';
const corsOptions={
    origin:["http://157.90.108.145:4000/",
        "http://91.251.68.132:3000/",
        "http://157.90.108.145:3000/",
        "http://31.2.208.231:3000/",
        "http://localhost:3000/",
    "http://157.90.108.145:6000/"],
    methods: ['GET','POST']
}

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(cors(corsOptions));
app.use(express.json());
app.use(methodOverride('_method'));
mongoose.connect(
    process.env.DB_URL,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    () => console.log("database connected...")
);
const conn = mongoose.createConnection(process.env.DB_URL, {useNewUrlParser: true , useUnifiedTopology: true});
let gfs;
conn.once('open' ,() => {
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})
try {

//create storage engine
const storage =  new GridFsStorage({
    url: process.env.DB_URL,
    options:{useUnifiedTopology: true},
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
const upload = multer({ storage });


app.post('/teacher/upload',upload.single('file'),(req,res,next)=>{
    res.json({file:req.file})
})
}catch (e) {
    console.log(e)
}
app.use(useragent.express());
app.use("/", [studentRouter, adminRouter, teacherRouter]);
app.use(errorHandler);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`up and running on port => ${port}`));

