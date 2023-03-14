const db = require("../models")

const getUser = (userId) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findByPk(userId);
        resolve({
            erroCode: user ? 0 : 1,
            mess: user ? "Thông tin người dùng" : "Người dùng không hợp lệ",
            data: {
                id: user.id,
                name: user.name,
                role: user.role,
            }
        })
    } catch (error) {
        reject(error)
    }
})

module.exports = {getUser}