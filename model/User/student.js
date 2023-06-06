const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptJS = require("bcrypt");

const StudentSchema = new mongoose.Schema({
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
  rollnumber: {
    type: String,
    unique: [true, "this roll number is already exist"],
  },

  section: {
    type: Number,
  },

  mothername: {
    name: String,
  },
  fathername: {
    name: String,
  },

  medical: {
    deses: String,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  subjects: [
    {
      name: String,
    },
  ],

  dateOfBirth: {
    type: Date,
    required: [true, "Please enter an DOB Date"],
  },
  previousSchool: {
    type: String,
    grade: Number,
    required: [true, "Please enter an previous school"],
  },
  lastclassmarks: {
    class: Number,
    type: String,
    required: [true, "Please enter an last class marks"],
  },
});


// password hashing
StudentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptJS.hash(this.password, 10);
});

// JWT token
StudentSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare password
StudentSchema.methods.comparePassword = async function (enterpassword) {
  return await bcryptJS.compare(enterpassword, this.password);
};

// module.exports = mongoose.model("Student", StudentSchema);