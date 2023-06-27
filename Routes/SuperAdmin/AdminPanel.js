const experss = require("express");
const router = experss.Router();
const Data = require("../../controller/Dashboard/Superadminpanel")
const auth = require("../../middleware/Auth");

router.route("/adminpanel").get( auth.isAuthenticateUser, auth.authorizeRole("superadmin"),  Data.SuperAdminPanel)
router.route("/adminpanelforadmin").get( auth.isAuthenticateUser, auth.authorizeRole("admin"),  Data.AdminPanel)

module.exports = router