const TryCatch = require("../../middelwear/TryCatch");
const User = require("../../model/User/User");
const ErrorHandler = require("../../utils/errorHandel");
const sendToken = require("../../utils/jwtToken");
const ApiFeatures = require("../../utils/apifeature");
const checkPostBody = require("../../utils/QueryCheck");

// create user
const AddUser = TryCatch(async (req, res, next) => {
    const role = req.user.role;
    if (role === "admin") {
     return await checkPostBody(["email", "password"], req);
    } else if (role === "teacher") {
     return await checkPostBody(["email", "password"], req);
    }
    else if (!role) {
      await User.create(req.body);
    }
  // const exist = req.user.role;
  // if (exist === "superadmin") {
  //   var user = await User.create(req.body);
  // } else {
  //   req.body.CreateByuser = req.user.id;
  //   req.body.schoolId = req.user.schoolId;
  //   var user = await User.create(req.body);
  // }

  res.status(201).json({
    success: true,
    user,
  });
});

// get user by id
const UserbyId = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // const user2 = await Admin.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
    user2,
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
const UpdateUser = TryCatch(async (req, res, next) => {
  const { userId } = req.params;
  const { studentdata, teacherdata } = req.body;
  if (!userId) {
    return res.json({ error: "please provid userId" });
  }
  var user = await User.findById(userId);
  if (!user) {
    return res.json({ error: "No User Avalible with this id" });
  }
  if (
    req.user.role == "superadmin" ||
    req.user.role == "admin" ||
    req.user.role == "principal"
  ) {
    var user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.json({ sucess: "succes details update succesfull", user });
  } else if (req.user.role == "teacher" || req.user.role == "student") {
    var user = await User.findByIdAndUpdate(
      userId,
      { studentdata, teacherdata },
      {
        new: true,
      }
    );
    res.json({ sucess: "succes details update succesfull", user });
  } else {
    return res.json({ error: "you are not allowed to update this user" });
  }
});

// delete user
const DeleteUser = TryCatch(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    return res.json({ error: "please provid userId" });
  }
  var user = await User.findById(userId);
  if (!user) {
    return res.json({ error: "No User Avalible with this id" });
  }
  var user = await User.findByIdAndDelete(userId);
  res.json({ sucess: "succes details delete succesfull", user });
});

// login user
const UserLogin = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(`Please enter email or password`, 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(500).json({ error: "Invalid email" });
  }

  const passMatch = await user.comparePassword(password);
  if (!passMatch) {
    return next(new ErrorHandler(`Invalid password`, 401));
  }
  const token = user.getJWTToken();
  sendToken(user, 200, res);
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

// honme page


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
