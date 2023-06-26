const express = require("express")
const router = express.Router()
const TotalFee = require("../../controller/Collection/FeeCollection")

router.route("/addClassFee").post(TotalFee.AddTotalFee);
router.route("/getallcalssFee").get(TotalFee.AllClass)

module.exports = router
