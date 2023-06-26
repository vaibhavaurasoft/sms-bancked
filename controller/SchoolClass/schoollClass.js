const SchoolClass = require("../../model/SchoolClass/Schoolclass");
const TryCatch = require("../../middelwear/TryCatch");
const ErrorHandler = require("../../utils/errorHandel");

// crate class
const AddClass = TryCatch(async (req, res, next) => {
  const classname = await SchoolClass.create(req.body);
  res.status(200).json({sucess : true,classname , message : "school class create succefull"})
});

// find class by id
const ClassDetails = TryCatch(async (req, res, next) => {
  const { classId } = req.params;
  if (!classId) {
    return new ErrorHandler("Please provide classId", 400);
  }
  const classdetails = await SchoolClass.findById(classId);
  if (!classdetails) {
    return new ErrorHandler("No School Available with this id", 400);
  }
  res.status(200).json({ sucess: true, classdetails });
})

const AllClass = TryCatch(async(req,res,next)=>{
    const query = req.query;
    const AllClass = await SchoolClass.find(query)
    const totalClass = await AllClass.length
  res
    .status(200)
    .json({ sucess: true, AllClass ,  totalClass });
})

const DeleteClass = TryCatch(async (req, res, next) => {
  const { classId } = req.params;

  if (!classId) {
    return res.status(400).json({
      success: false,
      message: "Please provide classId",
    });
  }
  const deletedClass = await SchoolClass.findByIdAndRemove(classId);

  if (!deletedClass) {
    return res.status(404).json({
      success: false,
      message: "Class not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Class deleted successfully",
    deletedClass,
  });
});


module.exports = {
  AddClass,
  AllClass,
  ClassDetails,
  DeleteClass
};