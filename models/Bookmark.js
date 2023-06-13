const mongoose = require("mongoose");

const Bookmark = new mongoose.Schema({
    salary: { type: String, required: true },
    UserId: {
        type: String, required: true
    },
    title: { type: String, required: true },
    profile: { type: String, required: true },
    Location: { type: String, required: true },
    companyname: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("Bookmark", Bookmark);