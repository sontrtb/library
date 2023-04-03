const router = require("express").Router()
const verifyToken = require("../middlewares/verify-token");
const verifyRole = require("../middlewares/verify-role");
const recomment = require("../controllers/recomment");

router.get('/', recomment.getTopInteraction)

router.use(verifyToken)
router.use(verifyRole.verifyRoleAdmin)

router.get('/percent_all', recomment.getPercentAll)

module.exports = router