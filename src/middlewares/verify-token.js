const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        res.status(500).json({
            erroCode: 1,
            mess: "Vui lòng đăng nhập"
        })
        return;
    }

    try {
        const accessToken = token.replace("Bearer ", "")
        const decoded = jwt.verify(accessToken, process.env.KEY_TOKEN)
        req.user = decoded
        next()
    } catch(err) {
        res.status(500).json({
            erroCode: 1,
            mess: "Vui lòng đăng nhập"
        })
    }
}

module.exports = verifyToken