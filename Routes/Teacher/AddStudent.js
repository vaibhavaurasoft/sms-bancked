const experss = require("express");
const router = experss.Router();
const auth = require("../../middelwear/Auth");
const Data = require("../../controller/userController/User")

// add student
router
  .route("/createstudent")
  .post(
    auth.isAuthenticateUser,
    auth.authorizeRole("teacher","admin","superadmin"),
    Data.AddUser
  );

// get all student list
router.route("/allstudent").get(
    auth.isAuthenticateUser,
    auth.authorizeRole("teacher",),
    Data.AllUser
) 

// get single student
router.route("/singlestudent/:id").get(
    auth.isAuthenticateUser,
    auth.authorizeRole("teacher"),
    Data.UserbyId
)

// update student
router.route("/updatestudent/:id").put(
    auth.isAuthenticateUser,
    auth.authorizeRole("teacher"),
    Data.UpdateUser
)

// delete student
router.route("/deletestudent/:id").delete(
    auth.isAuthenticateUser,
    auth.authorizeRole("teacher"),
    Data.DeleteUser
)



module.exports = router
