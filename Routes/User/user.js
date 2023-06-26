const experss = require("express");
const router = experss.Router();
const User = require("../../controller/userController/User");
const auth = require("../../middelwear/Auth");

// route for super Admin
router.route("/register").post(User.AddUser);
router.route("/login").post(User.UserLogin);
router
  .route("/userbyId/:id")
  .get(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    User.UserbyId
  );
router
  .route("/Alluser")
  .get(auth.isAuthenticateUser, auth.authorizeRole("superadmin"), User.AllUser);

// logout
router
  .route("/logout")
  .post(auth.isAuthenticateUser, User.LogOut);

// user Details
router.route("/me").get(auth.isAuthenticateUser, User.UserDetails);

// role check
// router.route("/role").get(auth.isAuthenticateUser,User.RoleCheck)

module.exports = router;
