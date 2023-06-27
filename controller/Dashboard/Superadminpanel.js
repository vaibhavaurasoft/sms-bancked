const TryCatch = require("../../middleware/TryCatch"); // TryCatch middleware
const School = require("../../model/SuperAdmin/School"); // School model
const User = require("../../model/User/User"); // User model
const Fee = require("../../model/admin/Fee"); // Fee model

// Super Admin Panel
const SuperAdminPanel = TryCatch(async (req, res) => {
  const TotalUser = await User.countDocuments();
  const totalTeacher = await User.countDocuments({
    role: "teacher",
  });
  const totalStudent = await User.countDocuments({
    role: "student",
  });
  const totalAdmin = await User.countDocuments({
    role: "admin",
  });
  const TotalSchool = await School.countDocuments();
  res.json({
    totalUser: TotalUser,
    totalTeachers: totalTeacher,
    totalStudents: totalStudent,
    totalAdmin: totalAdmin,
    totalSchool: TotalSchool,
  });
});
 
// admin panel
const AdminPanel = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId
  const TotalUser = await User.countDocuments({schoolId});
  const totalTeacher = await User.countDocuments({
    role: "teacher",
    schoolId,
  });
  const totalStudent = await User.countDocuments({
    role: "student",
    schoolId,
  });
  const totalAdmin = await User.countDocuments({
    role: "admin",
    schoolId,
  });
  
  res.json({
    totalUser: TotalUser,
    totalTeachers: totalTeacher,
    totalStudents: totalStudent,
    totalAdmin: totalAdmin,
  });
});

module.exports = {
  SuperAdminPanel,
  AdminPanel,
};
