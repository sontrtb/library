const router = require("express").Router()
const verifyRole = require("../middlewares/verify-role");
const verifyToken = require("../middlewares/verify-token");
const book = require("../controllers/book");

router.get("/", book.getAll)

router.use(verifyToken)
router.use(verifyRole.verifyRoleAdmin)

router.post('/create', book.create)
router.delete('/delete/:id', book.deleteBook)

module.exports = router