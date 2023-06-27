const express = require("express");
const router = express.Router();
const User = require("../../controller/UserController/User");
const auth = require("../../middleware/Auth");

// Routes for super admin

// register a new user
router.post("/register", User.AddUser);

// login
router.post("/login", User.UserLogin);

// get a user by ID
router.get(
  "/userbyId/:id",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  User.UserbyId
);

// get all users
router.get(
  "/Alluser",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  User.AllUser
);

// Route for user logout
router.post("/logout", auth.isAuthenticateUser, User.LogOut);

// get user details
router.get("/me", auth.isAuthenticateUser, User.UserDetails);


module.exports = router;
