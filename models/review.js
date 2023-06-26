const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    mentorId:{
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

const Review = mongoose.model("Review", ratingSchema);

module.exports = { Review, ratingSchema };
