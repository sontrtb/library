const db = require("../models")

const create = (data) => new Promise(async(resolve, reject) => {
    const {reactionId, bookId, userId} = data;
    try {
        const interaction = await db.Interaction.create({
            reactionId: reactionId,
            bookId: bookId,
            userId: userId,
        })

        const reactionConvert = () => {
            if(reactionId == 1) return "likeQuantity";
            else if(reactionId == 2) return "dislikeQuantity";
            else return "watchQuantity"
        }
        const reaction = reactionConvert();
        const reactionQuantity = await db.QuantityInteraction.findOne({
            where: {
                bookId: bookId,
            },
        });
        
        await db.QuantityInteraction.update(
            {
                [reaction]:  reactionQuantity.dataValues[reaction] + 1
            },
            {
                where: {
                    bookId: bookId,
                }
            }
        );

        resolve({
            erroCode: 0,
            mess: "Thêm cảm xúc thành công",
            data: interaction
        })
    } catch (error) {
        reject(error)
    }
})

module.exports = {create}