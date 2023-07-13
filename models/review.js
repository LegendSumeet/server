const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    mentorId:{
        type: String,
        required: true,
    },
    reviewBy:{
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
  
}
, { timestamps: true });


const Review = mongoose.model("Reviews", ratingSchema);

module.exports = { Review, ratingSchema };