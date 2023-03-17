const router = require("express").Router()
const verifyToken = require("../middlewares/verify-token");
const interaction = require("../controllers/interaction");

router.use(verifyToken)

router.post('/create', interaction.create)

module.exports = router