const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    Users:{
        
    },
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    },
    messages:[{

    }]
})


module.exports = mongoose.model('Chat',chatSchema);