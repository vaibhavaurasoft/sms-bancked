const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptJS = require("bcrypt");

const PrincipalSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: [true, "Please enter an age"],
  },
  address: {
    type: String,
    required: [true, "Please enter an address"],
  },
  mobilenumber: {
    type: Number,
    required: [true, "Please enter an mobile number"],
    maxLength: [12, "Number can not exceed 12 digits"],
    minLength: [10, "Number must be at least 10 digits"],
  },
  gender: {
    type: String,
    required: [true, "Please enter an gender"],
  },
  previousSchools: {
    type: String,
    required: [true, "Please enter an previousSchools"],
  },
  nationality: {
    type: String,
    default: "indian",
  },
  image: {
    type: String,
  },
  qualification: {
    type: String,
    required: [true, "please enter your qualification"],
  },
  degrees: {
    type: String,
    required: [true, "please enter your qualification"],
  },
  experience: {
    type: Number,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  nativeLanguage: {
    type: String,
  },
  otherLanguages: {
    type: String,
  },
  institutions: {
    type: String,
    required: [true, "please enter your institutions"],
  },
  certification: {
    type: String,
  },
  previousSchools: {
    type: String,
  },
  positions: {
    type: String,
    required: [true, "please enter your positions"],
  },
  skills: {
    type: String,
  },
  resume: {
    type: String,
    required: [true, "please sub,it your resume"],
  },
});

// password hashing
PrincipalSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptJS.hash(this.password, 10);
});

// JWT token
PrincipalSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare password
PrincipalSchema.methods.comparePassword = async function (enterpassword) {
  return await bcryptJS.compare(enterpassword, this.password);
};

// module.exports = mongoose.model("/Principal", PrincipalSchema);
