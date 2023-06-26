const { isAuthenticateUser } = require("../../middelwear/Auth");
const TryCatch = require("../../middelwear/TryCatch");
const User = require("../../model/User/User");
const ErrorHandler = require("../../utils/errorHandel");
const sendToken = require("../../utils/jwtToken");
const checkPostBody = require("../../utils/QueryCheck");
const Fee = require("../../model/admin/Fee");
const Userclass = require("../../model/SchoolClass/Schoolclass");

// create user
const AddUser = TryCatch(async (req, res, next) => {
  const role = req.user.role;
  if (role === "admin") {
    await checkPostBody(["email", "password"], req);
  } else if (role === "teacher") {
    await checkPostBody(["email", "password", "classId","name"], req);
  }
  req.body.CreateByuser = req.user.id;
  req.body.schoolId = req.user.schoolId;
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    user,
  });
});

// get user by id
// const UserbyId1 = TryCatch(async (req, res, next) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     return next(new ErrorHandler("user not found", 404));
//   }
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });


const UserbyId = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  // finding class
  const classid = user.classId;
  const classfind = await Userclass.findOne(classid);

  // finding fee
  const schoolId = req.user.schoolId;
  const classFees = await Fee.findOne({ schoolId, classId: classid });
  
  const totalFess = classFees.fees
  const totalpaidfee =
    user.feesinstall1 + user.feesinstall2 + user.feesinstall3;


  const remingfees =  totalFess - totalpaidfee
  const alldata = {
    ...user.toObject(),
    classs : classfind.className,
    allfess : totalFess,
    pandingFee : remingfees
  };
  res.status(200).json({
    success: true,
    alldata,
  }); 
}); 


// get all use
const AllUser = TryCatch(async (req, res) => {
  // for super admin
  if (req.user.role == "superadmin") {
    const query = req.query;
    const data = await User.find(query);


    const totalUser = data.length;
    res.status(200).json({ totalUser: totalUser, data });
  }

  //  for admin / owner
  else if (req.user.role === "admin") {
    const query = req.query;
    const schoolId = req.user.schoolId;
    const roleFilter = ["admin", "principal", "teacher", "student"];
    const searchQuery = {
      role: { $in: roleFilter },
      schoolId,
      ...query,
    };

    const data = await User.find(searchQuery);
    const totalUser = data.length;

    res.status(200).json({ totalUser, data });
  }

  //  for principal / teacher
  else if (req.user.role == "principal") {
    const query = req.query;
    const schoolId = req.user.schoolId;
    const roleFilter = ["principal", "teacher", "student"];
    const searchQuery = {
      role: { $in: roleFilter },
      schoolId,
      ...query,
    };

    const data = await User.find(searchQuery);
    const totalUser = data.length;

    res.status(200).json({ totalUser, data });
  }
  //  for student
  else if (req.user.role == "teacher") {
    const query = req.query;
    const schoolId = req.user.schoolId;
    const roleFilter = ["teacher", "student"];
    const searchQuery = {
      role: { $in: roleFilter },
      schoolId,
      ...query,
    };

    const data = await User.find(searchQuery);
    const totalUser = data.length;

    res.status(200).json({ totalUser, data });
  }
});

// update user

// const UpdateUser = TryCatch(async (req, res, next) => {
//   const { userId } = req.params;
//   const { studentdata, teacherdata } = req.body;
//   if (!userId) {
//     return res.json({ error: "please provide userId" });
//   }
//   var existingUser = await User.findById(userId);
//   if (!existingUser) {
//     return res.json({ error: "No User Available with this id" });
//   }
//   if (
//     req.user.role == "superadmin" ||
//     req.user.role == "admin" ||
//     req.user.role == "principal"
//   ) {
//     var updatedUser = await User.findByIdAndUpdate(userId, req.body, {
//       new: true,
//     });
//     res.json({
//       success: "successfully updated user details",
//       user: updatedUser,
//     });
//   } else if (req.user.role == "teacher" || req.user.role == "student") {
//     var updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { studentdata, teacherdata },
//       {
//         new: true,
//       }
//     );
//     res.json({
//       success: "successfully updated user details",
//       user: updatedUser,
//     });
//   } else {
//     return res.json({ error: "you are not allowed to update this user" });
//   }
// });

const UpdateUser = TryCatch(async(req,res)=>{
const userId = req.params.id;
var user = await User.findById(userId)  
 if (!user) {
   return next(new ErrorHandler("User not found", 404));
 }
  var user = await User.findByIdAndUpdate(
    userId,
    {$set:req.body},
    {new:true}
  )
 res.status(200).json({
   success: true,
   message: "Fees updated successfully",
   user
 });


})


const DeleteUser = TryCatch(async (req, res) => {
  const userId = req.params.id;
  var user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  var user = await User.findByIdAndDelete(
    userId,
  );
  res.status(200).json({
    success: true,
    message: "Fees delete successfully",
    user,
  });
});





// delete user
// const DeleteUser = TryCatch(async (req, res, next) => {
//   const { userId } = req.params;
//   if (!userId) {
//     return res.json({ error: "please provid userId" });
//   }
//   var user = await User.findById(userId);
//   if (!user) {
//     return res.json({ error: "No User Avalible with this id" });
//   }
//   var user = await User.findByIdAndDelete(userId);
//   res.json({ sucess: "succes details delete succesfull", user });
// });

// // 2 login user
const UserLogin = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(`Please enter email or password`, 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(500).json({ error: "Invalid email" });
    // return next(new ErrorHandler(`Invalid email`, 401));
  }

  const passMatch = await user.comparePassword(password);
  if (!passMatch) {
    // return next(new ErrorHandler(`Invalid password`, 401));
    return res.status(500).json({ error: "Invalid Password" });
  }

  // const token = user.getJWTToken();
  sendToken(user, 200, res);
  // sendToken(user);
});

// logout user
const LogOut = TryCatch(async (req, res, next) => {
  await res.clearCookie("token", { path: "/" });
  await res.status(200).send("user Logout");
});

// user details
const UserDetails = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    sucess: true,
    user,
  });
});

// roe detectore
// const RoleCheck = TryCatch(async(req,res,next)=>{
//    const user = await User.findById(req.user.id);
//    res.status(200).json({user:user.role})
// })

module.exports = {
  AddUser,
  AllUser,
  UserLogin,
  UpdateUser,
  DeleteUser,
  LogOut,
  UserDetails,
  UserbyId,
};
