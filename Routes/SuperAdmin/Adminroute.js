const express = require("express");
const router = express.Router();
const auth = require("../../middleware/Auth");
const Data = require("../../controller/UserController/User");

// add an admin
router.post(
  "/addadmin",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  Data.AddUser
);

// get all admins
router.get(
  "/alladmin",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  Data.AllUser
);

// get a single admin by ID
router.get(
  "/singleadmin/:id",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  Data.UserbyId
);

// update an admin
router.put(
  "/updateadmin/:id",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  Data.UpdateUser
);

// delete an admin
router.delete(
  "/deleteadmin/:id",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  Data.DeleteUser
);

module.exports = router;
