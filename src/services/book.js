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

        const interaction = db.Interaction.findAll(
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

        const results = await Promise.all([bookInfor, interaction]);
        const interactionConvert = results[1].map(item => {
            return {
                id: item.id,
                idReaction: item.reactionData.id,
                name: item.reactionData.name,
                userName: item.userData.name
            }
        })
        const response = {
            bookInfor: results[0],
            interaction: interactionConvert,
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
        resolve({
            erroCode: 0,
            mess: "Thêm sách thành công",
            data: bookInsert
        })
    } catch (error) {
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
    deleteBook
}