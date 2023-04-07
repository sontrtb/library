const router = require("express").Router();
const user = require("../controllers/user");
const verifyRole = require("../middlewares/verify-role");
const verifyToken = require("../middlewares/verify-token");

router.use(verifyToken)
router.get('/', user.getUser)

router.use(verifyRole.verifyRoleAdmin)

router.get('/list_user', user.getListUser)

module.exports = router;
