const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptJS = require("bcrypt");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
  role: {
    type: String,
    default: "student",
  },
  address: {
    type: String,
    // required: [true, "Please enter an address"],
  },
  mobilenumber: {
    type: Number,
    maxLength: [12, "Number can not exceed 12 digits"],
    minLength: [10, "Number must be at least 10 digits"],
  },
  schoolname: {
    type: String,
    // required: [true, "Please enter an schoolname"],
  },
  schoolAddress: {
    type: String,
    // required: true,
  },
  schoolType: {
    type: String,
    // required: [true, "Please enter an school address"],
  },
  educationalBackground: {
    type: String,
    // required: true,
  },
  businessRegistration: {
    type: String,
    // required: [true, "Please enter an businessRegistration"],
  },
  financialInformation: {
    type: String,
    // required: true,
  },
  references: {
    type: [String],
    // required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// password hashing
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptJS.hash(this.password, 10);
});

// JWT token
AdminSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare password
AdminSchema.methods.comparePassword = async function (enterpassword) {
  return await bcryptJS.compare(enterpassword, this.password);
};

// const Owner = mongoose.model("Admin", AdminSchema);

// module.exports = Owner;
