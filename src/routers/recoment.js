const router = require("express").Router()
const verifyToken = require("../middlewares/verify-token");
const verifyRole = require("../middlewares/verify-role");
const recomment = require("../controllers/recomment");

router.get('/', recomment.getTopInteraction)

router.use(verifyToken)
router.use(verifyRole.verifyRoleAdmin)

router.get('/top_interaction_user/:userId', recomment.getTopInteractionUser)
router.get('/recomment_category_user/:userId', recomment.getTopCategoryUser)
router.get('/percent_all', recomment.getPercentAll)
router.get('/percent_interaction_category', recomment.getPercentInteractionCategory)
router.get('/percent_user_category', recomment.getPercentUserCategory)

module.exports = router