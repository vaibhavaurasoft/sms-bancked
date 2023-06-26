const experss = require("express");
const router = experss.Router();
const Data = require("../../controller/superAdmin/adminpanel")

router.route("/adminpanel").get(Data.AdminPanel)

module.exports = router