const TryCatch = require("../../middelwear/TryCatch");
const School = require("../../model/SuperAdmin/SchoolSchema");
const User = require("../../model/User/User");
const Fee = require("../../model/admin/Fee");

const AdminPanel = TryCatch(async (req, res) => {
  const TotlUser = await User.countDocuments();
  const totalTeacher = await User.countDocuments({
    role: "teacher",
  });
  const totalstudent = await User.countDocuments({
    role: "student",
  });
  const totaladmin = await User.countDocuments({
    role: "admin",
  });
  const TotalSchool = await School.countDocuments();
  res.json({
    totalUser: TotlUser,
    totalTeachers: totalTeacher,
    totalStundents: totalstudent,
    totalAdmin: totaladmin,
    totalSchool: TotalSchool,
  });
});

module.exports = {
  AdminPanel,
};
