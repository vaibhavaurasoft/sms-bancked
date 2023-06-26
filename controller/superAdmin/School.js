const TryCatch = require("../../middelwear/TryCatch");
const School = require("../../model/SuperAdmin/SchoolSchema");
const ErrorHandler = require("../../utils/errorHandel");
// const ApiFeatures = require("../../utils/apifeature");
const User = require("../../model/User/User");
const checkPostBody = require("../../utils/QueryCheck");
const SchoolClass = require("../../model/SchoolClass/Schoolclass")
const Fee = require("../../model/admin/Fee")
const SchoolExame = require("../../model/ExamSchema/exammodel")

// crate school
const AddSchool2 = TryCatch(async (req, res) => {
  const {
    ownername,
    ownerimage,
    owneremail,
    ownerphonenumber,
    principalname,
    principalimage,
    principalemail,
    principalphonenumber,
    contectpersonname,
    contectpersonimage,
    contectpersonemail,
    contectpersonphonenumber,
    schoolname,
    schoollogo,
    schoolimage,
    schoolemail,
    city,
    address,
    schoolId,
    entrollmentYear,
    schooltype,
    bordtype,
    schoollevel,
    schoolwebsite,
    libraryavailability,
    sportfacility,
    transportservice,
    totalstudent,
    totalteacher,
  } = req.body;

  const newSchool = await School.create({
    ownername: ownername || "Ankur",
    ownerimage: ownerimage || [],
    owneremail: owneremail || "ankur@example.com",
    ownerphonenumber: ownerphonenumber || 1234567890,
    principalname: principalname || "jaya mittal",
    principalimage: principalimage || [],
    principalemail: principalemail || "ja@example.com",
    principalphonenumber: principalphonenumber || 9876543210,
    contectpersonname: contectpersonname || "vaibha",
    contectpersonimage: contectpersonimage || [],
    contectpersonemail: contectpersonemail || "vai@example.com",
    contectpersonphonenumber: contectpersonphonenumber || 8765432109,
    schoolname: schoolname || "ABC School",
    schoollogo: schoollogo || [],
    schoolimage: schoolimage || [],
    schoolemail: schoolemail || "abc@example.com",
    city: city || "City",
    address: address || "Address",
    entrollmentYear: entrollmentYear || 2022,
    schooltype: schooltype || "Public",
    bordtype: bordtype || "State",
    schoollevel: schoollevel || "Primary",
    schoolwebsite: schoolwebsite || "www.abcschool.com",
    libraryavailability: libraryavailability || true,
    sportfacility: sportfacility || true,
    transportservice: transportservice || true,
    totalstudent: totalstudent || 1000,
    totalteacher: totalteacher || 50,
  });
  
  res.json({ message: "School added successfully", school: newSchool });
});


// add school and admin same time
const AddSchool = TryCatch(async (req, res, next) => {
  await checkPostBody(
    ["schoolname", "name", "email", "password", "address", "city"],
    req
  );
  const { schoolname, email, name, password, address, city } = req.body;


  const school = await School.create({ schoolname, address, city });

  const Admin = await User.create({
    name,
    email,
    role: "admin",
    password,
    schoolId: school._id,
  });
  res.json({ message: "Accound created succesfull", school, Admin });
});


// 23 jun

// const AllSchool = TryCatch(async (req, res, next) => {
//   const query = req.query;
//   const SchoolList = await School.find(query);

//   const schoolsWithCounts = await Promise.all(
//     SchoolList.map(async (school) => {
//       // total teacher
//       const totalTeacher = await User.countDocuments({
//         schoolId: school._id,
//         role: "teacher",
//       });
//       // total student
//       const totalStudent = await User.countDocuments({
//         schoolId: school._id,
//         role: "student",
//       });
//       // total admin
//       const totalAdmin = await User.countDocuments({
//         schoolId: school._id,
//         role: "admin",
//       });

//       // total user
//       const totalUser = await User.countDocuments({
//         schoolId: school._id,
//       });

//       return {
//         ...school.toObject(),
//         totalStudent,
//         totalTeacher,
//         totalAdmin,
//         totalUser,
//       };
//     })
//   );

//   const totalSchool = schoolsWithCounts.length;
//   const finalData = schoolsWithCounts.reverse();
//   const totalUser = await User.countDocuments();
//   const totalStudent = await User.find({role:"student"}).countDocuments();
//   const totalTeacher = await User.find({ role: "tacher" }).countDocuments();
//   const totalSuperAdmin = await User.find({ role: "superadmin" }).countDocuments();
//   res.status(200).json({
//     totalSchool,
//     totalTeacher,
//     totalSuperAdmin,
//     totalUser,
//     totalStudent,
//     SchoolList: finalData,
//   });
// });

const AllSchool = TryCatch(async (req, res, next) => {
  const query = req.query;
  const SchoolList = await School.find(query);


  const schoolsWithCounts = await Promise.all(
    SchoolList.map(async (school) => {
      // total teacher
      const totalTeacher = await User.countDocuments({
        schoolId: school._id,
        role: "teacher",
      });
      // total student
      const totalStudent = await User.countDocuments({
        schoolId: school._id,
        role: "student",
      });
      // total admin
      const totalAdmin = await User.countDocuments({
        schoolId: school._id,
        role: "admin",
      });

      // total user
      const totalUser = await User.countDocuments({
        schoolId: school._id,
      });

      return {
        ...school.toObject(),
        totalStudent,
        totalTeacher,
        totalAdmin,
        totalUser,
      };
    })
  );

  const totalSchool = schoolsWithCounts.length;
  const finalData = schoolsWithCounts.reverse();
  const totalUser = await User.countDocuments();
  const totalStudent = await User.find({ role: "student" }).countDocuments();
  const totalTeacher = await User.find({ role: "tacher" }).countDocuments();
  const totalSuperAdmin = await User.find({
    role: "superadmin",
  }).countDocuments();
  res.status(200).json({
    totalSchool,
    totalTeacher,
    totalSuperAdmin,
    totalUser,
    totalStudent,
    SchoolList: finalData,
  });
});





// get school by id
const SchoolDetails = TryCatch(async (req, res, next) => {
  const { schoolId } = req.params;
  if (!schoolId) {
    return new ErrorHandler("Please provide SchoolId", 400);
  }

  const schooldetails = await School.findById(schoolId);
  if (!schooldetails) {
    return new ErrorHandler("No School Available with this id", 400);
  }

  // finding Exam
  const exams = await SchoolExame.find({schoolId});

  // finding total fees 
  const fees = await Fee.find({schoolId})

  // finding total class
  const totalClass = await Fee.countDocuments({ schoolId });

  // finding totoal user
  const totalTeacher = await User.countDocuments({
    schoolId: schooldetails._id,
    role: "teacher",
  });

  const totalStudent = await User.countDocuments({
    schoolId: schooldetails._id,
    role: "student",
  });

  const totalAdmin = await User.countDocuments({
    schoolId: schooldetails._id,
    role: "admin",
  });

  const totalUser = await User.countDocuments({
    schoolId: schooldetails._id,
  });


  const schoolWithCounts = {
    ...schooldetails.toObject(),
    totalStudent,
    totalTeacher,
    totalAdmin,
    totalUser,
    totalclass : totalClass,
    classes:fees,
    exams
  };

  res.json({ success: "School details fetched successfully", School: schoolWithCounts });
});


// update Data in  School
const UpdateSchoolDetails = TryCatch(async (req, res) => {
  const { schoolId } = req.params;
  if (!schoolId) {
    return new ErrorHandler("please provid SchoolId", 400);
  }
  var school = await School.findById(schoolId);
  if (!school) {
    return new ErrorHandler("No School Avalible with this id", 400);
  }

  // update data
  var school = await School.findByIdAndUpdate(
    schoolId,
    { $set: req.body },
    { new: true }
  );
  res.json({ sucess: "succes details update succesfull", school });
});

// delete school
const DeleteSchool = TryCatch(async (req, res, next) => {
  const { schoolId } = req.params;
  if (!schoolId) {
    return res.json({ error: "No School Avalible with this id" });
  }
  const school = await School.findByIdAndDelete(schoolId);
  if (!school) {
    return res.json({ error: "No School Avalible with this id" });
  }
  res.json({ sucess: "succes details delete succesfull", school });
});


module.exports = {
  AddSchool,
  AllSchool,
  SchoolDetails,
  UpdateSchoolDetails,
  DeleteSchool,
};
