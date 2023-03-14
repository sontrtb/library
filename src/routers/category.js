const router = require("express").Router();
const verifyRole = require("../middlewares/verify-role");
const verifyToken = require("../middlewares/verify-token");
const category = require("../controllers/category");

router.use(verifyToken)
router.use(verifyRole.verifyRoleAdmin)
router.post('/create', category.create)

module.exports = router;