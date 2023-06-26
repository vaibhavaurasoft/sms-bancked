const express = require("express")
const router = express.Router()
const SchoolClass = require("../../controller/SchoolClass/schoollClass")

router.route("/addclass").post(SchoolClass.AddClass);
router.route("/allclass").get(SchoolClass.AllClass);
router.route("/classdetails/:classId").get(SchoolClass.ClassDetails);
router.route("/classdelete/:classId").delete(SchoolClass.DeleteClass);

module.exports = router;
