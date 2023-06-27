const express = require("express");
const router = express.Router();
const auth = require("../../middleware/Auth");
const Schooldata = require("../../controller/SuperAdmin/School");

// Routes for managing schools

// create a new school
router.post(
  "/createschool",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  Schooldata.AddSchool
);

// get all schools
router.get(
  "/allschool",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  Schooldata.AllSchool
);

// get school details by ID
router.get(
  "/schooldetails/:schoolId",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin", "admin"),
  Schooldata.SchoolDetails
);

// update school details by ID
router.put(
  "/updateschooldetails/:schoolId",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  Schooldata.UpdateSchoolDetails
);

// delete a school by ID
router.delete(
  "/deleteschool/:schoolId",
  auth.isAuthenticateUser,
  auth.authorizeRole("superadmin"),
  Schooldata.DeleteSchool
);

module.exports = router;
