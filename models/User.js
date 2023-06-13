const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  location: { type: String },
  isAdmin: { type: Boolean, default: false },
  isMentor: { type: Boolean, default: false },
  profile: { type: String, default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
