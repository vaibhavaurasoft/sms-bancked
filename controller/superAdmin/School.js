const TryCatch = require("../../middelwear/TryCatch");
const School = require("../../model/SuperAdmin/SchoolSchema");
const ErrorHandler = require("../../utils/errorHandel");
const ApiFeatures = require("../../utils/apifeature");
const  User = require("../../model/User/User");
const checkPostBody = require("../../utils/QueryCheck")

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
    schoolId: schoolId || 1234,
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

// Get All school

const AllSchool = TryCatch(async (req, res, next) => {
  const query = req.query;
  const SchoolList = await School.find(query);
  const totalSchool = SchoolList.length;

  // const resultPerPage = 5;

  // const apiFeature = new ApiFeatures(School.find(), req.query)
  //   .search()
  //   .pagination(resultPerPage);

  // let products = await apiFeature.query;
  // const totalSchool = products.length;

  res.status(200).json({
    totalSchool,
    SchoolList,
  });
});

// get school by id
const SchoolDetails = TryCatch(async (req, res, next) => {
  const { schoolId } = req.params;
  if (!schoolId) {
    return new ErrorHandler("please provid SchoolId", 400);
  }
  const schooldetails = await School.findById(schoolId);
  if (!schooldetails) {
    return new ErrorHandler("No School Avalible with this id", 400);
  }
  res.json({ succes: "school details fetch Sccesfull", School: schooldetails });
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

// testing
const AddSchool = TryCatch(async (req, res, next) => {
  await checkPostBody(["schoolname", "name", "email", "password"], req);
  const {schoolname,email,name,password} =  req.body;

  const school = await School.create({schoolname})
  const Admin = await User.create({
    name,
    email,
    role:"admin",
    password,
    schoolId:school._id
  })
  res.json({message: "Accound created succesfull",school,Admin})

})
module.exports = {
  AddSchool,
  AllSchool,
  SchoolDetails,
  UpdateSchoolDetails,
  DeleteSchool,
};
