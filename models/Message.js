const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        trim: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true
    },
    receiver: {
        type: String,
        trim: true

    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    readBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]


})
module.exports = mongoose.model('Message', messageSchema);