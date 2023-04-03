const router = require("express").Router();
const user = require("../controllers/user");
const verifyToken = require("../middlewares/verify-token");

router.use(verifyToken)
router.get('/', user.getUser)

module.exports = router;
