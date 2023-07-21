const mongoose = require('mongoose');
const { Schema } = mongoose;

const slotSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  requestID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimeRequest"
  },
  slots: [
    {
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
});

const cnfSlot = mongoose.model('ConfirmSlot', slotSchema);

module.exports = cnfSlot;
