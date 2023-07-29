const mongoose = require('mongoose');
const { Schema } = mongoose;

const SlotSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    mentorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
    },
    requestID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TimeRequest"
    },
    email:{
        type:String,
        required:true
    },
    slots: [
        {
            date: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
        },
    ],
}, { timestamps: true },
);

const Slot = mongoose.model("MentorSlots", SlotSchema);
module.exports = Slot;  