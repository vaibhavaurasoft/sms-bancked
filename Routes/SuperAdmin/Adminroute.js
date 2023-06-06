const experss = require("express");
const router = experss.Router();
const auth = require("../../middelwear/Auth");
const Data = require("../../controller/userController/User")


// add admin
router.route("/addadmin").post(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Data.AddUser
)

// all admin
router.route("/alladmin").get(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Data.AllUser
)
  
// single admin
router.route("/singleadmin/:id").get(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Data.UserDetails
)

// update admin
router.route("/updateadmin/:id").put(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Data.UpdateUser
)

// delete admin
router.route("/deleteadmin/:id").delete(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Data.DeleteUser
)

module.exports = router;