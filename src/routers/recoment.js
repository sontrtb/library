const router = require("express").Router()
const verifyToken = require("../middlewares/verify-token");
const recomment = require("../controllers/recomment");

router.get('/', recomment.getTopInteraction)

module.exports = router