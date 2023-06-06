const experss = require("express");
const router = experss.Router();
const auth = require("../../middelwear/Auth");
const Schooldata = require("../../controller/superAdmin/School");

// For School

router
  .route("/createschool")
  .post(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Schooldata.AddSchool
  );
router
  .route("/createschool")
  .post(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Schooldata.AddSchool
  );
router
  .route("/allschool")
  .get(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Schooldata.AllSchool
  );
router
  .route("/schooldetails/:schoolId")
  .post(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Schooldata.SchoolDetails
  );
router
  .route("/updateschooldetails/:schoolId")
  .put(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Schooldata.UpdateSchoolDetails
  );
router
  .route("/deleteschool/:schoolId")
  .delete(
    auth.isAuthenticateUser,
    auth.authorizeRole("superadmin"),
    Schooldata.DeleteSchool
  );

module.exports = router;
