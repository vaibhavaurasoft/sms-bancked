const express = require("express");
const app = express();
const Error = require("./middelwear/error");
// parse
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// superadmin routes
const School = require("./Routes/SuperAdmin/Schoolroute");
const addadmin = require("./Routes/SuperAdmin/Adminroute");

// admin routes 
const addTeacher = require("./Routes/Admin/AddTeacher");

// teacher routes
const addstudent = require("./Routes/Teacher/AddStudent");
// 
// routes
const User = require("./Routes/User/user");

// expreess use
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// super admin
app.use("/api/v1", School);
app.use("/api/v1", addadmin);

// admin
app.use("/api/v1", addTeacher);

// teacher
app.use("/api/v1", addstudent);

// calling apis
app.use("/api/v1", User);

app.get("/api/v1",(req,res)=>{
    res.status(200).json({sucess :  "data is working properly"})
})

// middelwear for error
app.use(Error);

module.exports = app;
