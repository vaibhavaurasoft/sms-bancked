const express = require("express");
const router = express.Router();
const auth = require("../../middelwear/Auth");
const Data = require("../../controller/admin/Fee");

router
  .route("/addfee")
  .post(auth.isAuthenticateUser, auth.authorizeRole("admin"), Data.AddFees);
router
  .route("/allfees")
  .get(
    auth.isAuthenticateUser,
    auth.authorizeRole("admin", "superadmin", "teacher"),
    Data.SeeAllFee
  );

router
  .route("/feesbyclassid/:id")
  .get(auth.isAuthenticateUser, Data.GetFeesByClassName);

router
  .route("/updatefee")
  .put(auth.isAuthenticateUser, auth.authorizeRole("admin"), Data.UpdateFees);

module.exports = router;
