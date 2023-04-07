const db = require("../models")
const { Op } = require("sequelize");

// top 3 like, dislike, watch
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

// list like, dislike, watch user
const getTopInteractionUser = (userId) => new Promise(async (resolve, reject) => {
    try {
        const interaction = await db.Interaction.findAll(
            {
                where: { userId: userId },
                include: [
                    {
                        model: db.Book,
                        as: "bookData",
                        attributes: ["id", "title", "introduce", "image", "content", "categoryId"]
                    },
                ]
            }
        );

        const arrLike = [];
        const arrDislike = [];
        const arrWatch = [];
        interaction.forEach(element => {
            if(element.reactionId === 1) {
                arrLike.push(element.bookData)
            }
            else if(element.reactionId === 2) {
                arrDislike.push(element.bookData)
            } else  arrWatch.push(element.bookData)
        });

        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: {
                like: arrLike,
                dislike: arrDislike,
                arrWatch: arrWatch
            }
        })
    
    } catch (error) {
        console.log("error", error)
        reject(error)
    }
})

// top category recomment user
const getTopCategoryUser = (userId) => new Promise(async (resolve, reject) => {
    try {
        const interaction = await db.Interaction.findAll(
            {
                where: {
                    userId: userId,
                    [Op.or]: [
                      { reactionId: 1 },
                      { reactionId: 2 }
                    ]
                },
                include: [
                    {
                        model: db.Book,
                        as: "bookData",
                        attributes: ["categoryId"]
                    },
                ]
            }
        );

        const arrCategory = []
        interaction.forEach((e) => {
            if(!arrCategory.includes(e.bookData.categoryId)) {
                arrCategory.push(e.bookData.categoryId)
            }
        })

        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: arrCategory
        })
    
    } catch (error) {
        console.log("error", error)
        reject(error)
    }
})

const getPercentAll = () => new Promise(async (resolve, reject) => {
    try {
        const likeQuantity = db.QuantityInteraction.sum("likeQuantity")
        const dislikeQuantity = db.QuantityInteraction.sum("dislikeQuantity")
        const watchQuantity = db.QuantityInteraction.sum("watchQuantity")
    
        const allQuantity = await Promise.all([likeQuantity, dislikeQuantity, watchQuantity])

        const dataConvert = {
            percentLikeWatch: allQuantity[0]/allQuantity[3] * 100,
            percentDislikeWatch: allQuantity[1]/allQuantity[3] * 100,
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

module.exports = {
    getTopInteraction,
    getPercentAll,
    getTopInteractionUser,
    getTopCategoryUser
}