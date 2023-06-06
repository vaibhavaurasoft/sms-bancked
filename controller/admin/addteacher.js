// const TryCatch = require("../../middelwear/TryCatch");
// const User = require("../../model/User/User");
// const ErrorHandler = require("../../utils/errorHandel");
// const sendToken = require("../../utils/jwtToken");
// const ApiFeatures = require("../../utils/apifeature");

// // create admin
// const AddTeacher = TryCatch(async (req, res, next) => {
//   req.body.CreateByuser = req.user.id;
//   req.body.schoolId = req.user.schoolId;
//   const user = await User.create(req.body);
//   res.status(201).json({
//     success: true,
//     user,
//   });
// });



// // get all user list

// const AllTeacher = TryCatch(async (req, res, next) => {
//   const query = req.query;
//   const schoolId = req.user.schoolId;
//   const roleFilter = ["admin", "principal", "teacher", "student"];
//   const searchQuery = {
//     role: { $in: roleFilter },
//     schoolId: schoolId,
//     ...query,
//   };

//   const data = await User.find(searchQuery);
//   // const data2 = await User.find(query);

//   const totalUser = data.length;

//   res.status(200).json({ totalUser, data });
// });

// // get single admin
// const SingleTeacher = TryCatch(async (req, res, next) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     return next(new ErrorHandler("user not found", 404));
//   }
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

// // update admin
// const UpdateTeacher = TryCatch(async (req, res, next) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!user) {
//     return next(new ErrorHandler("user not found", 404));
//   }
//   res.status(200).json({
//     success: true,
//     user,
//   })
// });

// // delete admin
// const DeleteTeacher = TryCatch(async (req, res, next) => {
//   const user = await User.findByIdAndDelete(req.params.id);
//   if (!user) {
//     return next(new ErrorHandler("user not found", 404));
//   }
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });
// // login user
// const TeacherLogin = TryCatch(async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return next(new ErrorHandler(`Please enter email or password`, 400));
//   }

//   const user = await User.findOne({ email }).select("+password");
//   if (!user) {
//     return res.status(404).json({ error: "Invalid email" });
//   }

//   const passMatch = await user.comparePassword(password);
//   if (!passMatch) {
//     return next(new ErrorHandler(`Invalid password`, 400));
//   }
//   const token = user.getJWTToken();
//   sendToken(user, 200, res);
// });

// module.exports = {
//   AddTeacher,
//   AllTeacher,
//   SingleTeacher,
//   UpdateTeacher,
//   DeleteTeacher,
//   TeacherLogin,
// };
