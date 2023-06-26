const mongoose = require("mongoose");

const TotalFees = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schools",
    required: [true, "please enter schoolId"],
    unique: false,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "please enter classId"],
  },
  fees: {
    type: Number,
    required: [true, "please enter fees"],
  },

 

});

module.exports = mongoose.model("Fee", TotalFees);
