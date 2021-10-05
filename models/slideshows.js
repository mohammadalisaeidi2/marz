import mongoose from "mongoose";

const slideShowScema= new mongoose.Schema({

    title:{
        type: String,
        required:true,
        minlength: 3
    },
    body:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }
})


module.exports = mongoose.model("slideShows", slideShowScema)
