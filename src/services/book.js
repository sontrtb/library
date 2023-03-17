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
    create,
    deleteBook
}