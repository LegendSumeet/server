const mongoose = require("mongoose");

const Mentor = new mongoose.Schema({
    title: { type: String, required: true },
    Location: { type: String, required: true },
    salary:{type:String,required:true},
    period:{type:String,required:true},
    description:{type:String,required:true},
    companyname:{type:String,required:true},
    MentorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});

