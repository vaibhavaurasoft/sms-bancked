const TryCatch = require("./TryCatch");
const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

const isAuthenticateUser = TryCatch(async (req, res, next) => {

  const { token } = req.cookies;
  if (!token) {
    return res
      .status(404)
      .json({ failed: "Please login to access this fecility" });
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData.id);
  next();
});

// const isAuthenticateUser = TryCatch(async (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   if (!bearerHeader) {
//     res.status(403).json({ resCode: 403, message: "Unauthorized access" });
//   }

//   const bearerToken = bearerHeader.split(" ")[1];
//   req.token = bearerToken;
//   const decodeData = await jwt.verify(bearerToken, process.env.JWT_SECRET);
//   req.user = await User.findById(decodeData.id);
//   next();
// });

// auth rise role
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.json({
          failed: `Role : ${req.user.role} is not allowed to access this resouces`,
        })
      );
    }
    next();
  };
};

module.exports = { isAuthenticateUser, authorizeRole };
