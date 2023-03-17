const db = require("../models")

const create = (data) => new Promise(async(resolve, reject) => {
    const {reactionId, bookId, userId} = data;
    try {
        const Interaction = await db.Interaction.create({
            reactionId: reactionId,
            bookId: bookId,
            userId: userId,
        })
        resolve({
            erroCode: 0,
            mess: "Thêm cảm xúc thành công",
            data: Interaction
        })
    } catch (error) {
        reject(error)
    }
})

module.exports = {create}