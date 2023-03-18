const db = require("../models")

const getAll = () => new Promise(async (resolve, reject) => {
    try {
        const books = await db.Book.findAll({
            include: [
                {
                    model: db.Category,
                    as: "categoryData",
                    attributes: ["id", "name"]
                }
            ]
        });
        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: books
        })
    } catch (error) {
        reject(error)
    }
})

const getDetail = (id) => new Promise(async (resolve, reject) => {
    try {
        const bookInfor = db.Book.findByPk(
            id,
            {
                attributes: ["id", "title", "image", "content", "introduce"]
            },
            {
                include: [
                    {
                        model: db.Category,
                        as: "categoryData",
                        attributes: ["id", "name"]
                    },
                ]
            }
        );

        const reactionQuantity = db.QuantityInteraction.findOne({
            where: {
                bookId: id,
            },
            attributes: ["watchQuantity", "dislikeQuantity", "likeQuantity"]
        });

        const results = await Promise.all([bookInfor, reactionQuantity]);
  
        const response = {
            ...results[0].dataValues,
            ...results[1].dataValues,
        }
        
        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: response
        })
    } catch (error) {
        reject(error)
    }
})

const getInteraction = (id) => new Promise(async (resolve, reject) => {
    try {
        const interaction = await db.Interaction.findAll(
            {
                where: { bookId: id },
                include: [
                    {
                        model: db.Reaction,
                        as: "reactionData",
                        attributes: ["id", "name"]
                    },
                    {
                        model: db.User,
                        as: "userData",
                        attributes: ["name"]
                    }
                ]
            }
        );

        const interactionConvert = interaction?.map(item => {
            return {
                id: item.id,
                idReaction: item.reactionData?.id,
                name: item?.reactionData?.name,
                userName: item?.userData?.name
            }
        })

        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: interactionConvert
        })
    } catch (error) {
        reject(error)
    }
})


const create = (data) => new Promise(async(resolve, reject) => {
    const {title, image, content, categoryId, introduce} = data;
    try {
        const bookInsert = await db.Book.create({
            title: title,
            image: image,
            content: content,
            categoryId: categoryId,
            introduce: introduce
        })

        await db.QuantityInteraction.create({
            bookId: bookInsert.dataValues.id
        })

        resolve({
            erroCode: 0,
            mess: "Thêm sách thành công",
            data: bookInsert
        })
    } catch (error) {
        console.log("error", error)
        reject(error)
    }
})

const deleteBook = (id) => new Promise(async(resolve, reject) => {
    try {
        const book = await db.Book.findByPk(id);

        if(!book) {
            resolve({
                erroCode: 1,
                mess: "Sách không tồn tại",
            })
        }
        
        await db.Book.destroy({
            where: {
            id: id
            }
        })
        resolve({
            erroCode: 0,
            mess: "Xóa sách thành công",
        })
    } catch (error) {
        reject(error)
    }
})

module.exports =  {
    getAll,
    getDetail,
    create,
    deleteBook,
    getInteraction
}