const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    userId:{
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
  
});

module.exports = ratingSchema;
