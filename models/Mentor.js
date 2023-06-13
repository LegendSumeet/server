const mongoose = require("mongoose");

const Mentor = new mongoose.Schema({

    MentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
        required: true
    },
    userId: {
        type: String,
        required: true

    }
}, { timestamps: true });

module.exports = mongoose.model("Mentor", Mentor);