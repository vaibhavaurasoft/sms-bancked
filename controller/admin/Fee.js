const Fee = require("../../model/admin/Fee");
const TryCatch = require("../../middelwear/TryCatch");
const ErrorHandler = require("../../utils/errorHandel");
const SchoolClass = require("../../model/SchoolClass/Schoolclass")
const School = require("../../model/SuperAdmin/SchoolSchema")

// add fess
const AddFees = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  const { classId, fees } = req.body;

  // find class
  const findClass = await SchoolClass.findOne({_id : classId });
  // Check if class already exists for the school
  const existingClass = await Fee.findOne({ schoolId, classId });
  if (existingClass) {
    return res.status(400).json({
      success: false,
      message: `Class ${findClass.className} already exists for the school pleae update class fee`,
    });
  }

  // Create a new class entry
  const SchoolFeeByClass = await Fee.create({ classId, fees, schoolId });

  res.status(200).json({
    success: true,
    message: `School class - ${findClass.className} fees have been added`,
    SchoolFeeByClass,
  });
});

// see all fess
const SeeAllFee = TryCatch(async (req, res) => {
  if (req.user.role == "superadmin") {
    const schoolFess = await Fee.find();
    res.json({ success: true, schoolFess });
  }
  // admin
  else if (req.user.role === "admin" || req.user.role === "teacher") {
    const schoolId = req.user.schoolId;
    const searchQuery = {
      schoolId,
    };
    const schoolcheck = await School.findById(schoolId)
    const data = await Fee.find(searchQuery);
    res.status(200).json({ School: schoolcheck.schoolname, data });
  }
});

// GetFeesByClassName
const GetFeesByClassName = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  const { id } = req.params;
  console.log(id);

  const existingClass = await Fee.findOne({ schoolId, classId: id }); // Use 'id' instead of 'classId'

  if (!existingClass) {
    return res.status(404).json({
      success: false,
      message: "Class not found",
    });
  }

  const data = existingClass.fees;
  res.status(200).json({
    success: true,
    message: "School fees have been added",
    existingClass,
    fees: data,
  });
});

// update fees
const UpdateFees = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  
  const { classId, fees } = req.body;

  const existingClass = await Fee.findOne({ schoolId, classId });
  console.log(existingClass);

  // If the class doesn't exist, return an error
  if (!existingClass) {
    return res.status(404).json({
      success: false,
      message: "Class not found",
    });
  }

  // Update the fees for the class
  existingClass.fees = fees;
  await existingClass.save();

  res.status(200).json({
    success: true,
    message: "Fees updated successfully",
    updatedClass: existingClass,
  });
});

module.exports = {
  AddFees,
  SeeAllFee,
  UpdateFees,
  GetFeesByClassName,
};
