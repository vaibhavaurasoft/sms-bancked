const experss = require("express");
const router = experss.Router();
const auth = require("../../middelwear/Auth");
// const TeacherData = require("../../controller/admin/addteacher");
const Data = require("../../controller/userController/User")

// add teacher
router
  .route("/addteacher")
  .post(auth.isAuthenticateUser, auth.authorizeRole("admin"), Data.AddUser);
 
// all teacher
router.route("/allteacher").get(
    auth.isAuthenticateUser,
    auth.authorizeRole("admin"),
    Data.AllUser
)

// single teacher
router.route("/singleteacher/:id").get(
    auth.isAuthenticateUser,
    auth.authorizeRole("admin"),
    Data.UserbyId
)

// update teacher
router.route("/updateteacher/:id").put(
    auth.isAuthenticateUser,
    auth.authorizeRole("admin"),
    Data.UpdateUser
)

// delete teacher
router.route("/deleteteacher/:id").delete(
    auth.isAuthenticateUser,
    auth.authorizeRole("admin"),
    Data.DeleteUser
)

module.exports = router
