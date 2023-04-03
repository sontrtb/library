const verifyRoleAdmin = (req, res, next) => {
    const {role} = req.user
    if(role !== "admin") {
        res.status(401).json({
            erroCode: 1,
            mess: "Không có quyền truy cập"
        })
        return;
    }
    next();
}

module.exports = {verifyRoleAdmin}