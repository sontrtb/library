const db = require("../models")

const getTopInteraction = () => new Promise(async (resolve, reject) => {
    try {
        const topLike = db.QuantityInteraction.findAll({
                limit: 3,
                order: [
                    ['likeQuantity', 'DESC']
                ],
                attributes: ["likeQuantity", "dislikeQuantity", "watchQuantity", "bookId"],
                include: [
                    {
                        model: db.Book,
                        as: "bookData",
                        attributes: ["title", "image", "introduce"]
                    },
                ]
            }
        )
        const topDislike = db.QuantityInteraction.findAll({
            limit: 3,
            order: [
                ['dislikeQuantity', 'DESC']
            ],
            attributes: ["likeQuantity", "dislikeQuantity", "watchQuantity", "bookId"],
                include: [
                    {
                        model: db.Book,
                        as: "bookData",
                        attributes: ["title", "image", "introduce"]
                    },
                ]
        })
        const topWatch = db.QuantityInteraction.findAll({
            limit: 3,
            order: [
                ['watchQuantity', 'DESC']
            ],
            attributes: ["likeQuantity", "dislikeQuantity", "watchQuantity", "bookId"],
                include: [
                    {
                        model: db.Book,
                        as: "bookData",
                        attributes: ["title", "image", "introduce"]
                    },
                ]
        })

        const topList = await Promise.all([topLike, topDislike, topWatch])

        const convertData = (data) => {
            return data.map(item => {
                return {
                    id: item.bookId,
                    likeQuantity: item.likeQuantity,
                    dislikeQuantity: item.dislikeQuantity,
                    watchQuantity: item.watchQuantity,
                    title: item.bookData?.title,
                    image: item.bookData?.image,
                    introduce: item.bookData?.introduce
                }
            })
        }
        const dataConvert = {
            topLike: convertData(topList[0]),
            topWatch: convertData(topList[1]),
            topDislike: convertData(topList[2]),
        }

        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: dataConvert
        })
    
    } catch (error) {
        console.log("error", error)
        reject(error)
    }
})

module.exports = {getTopInteraction}