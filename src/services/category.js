const db = require("../models")

const getAll = () => new Promise(async (resolve, reject) => {
    try {
        const category = await db.Category.findAll();
        const categoryConvert = category.map(item => {
            return {
                value: item.id,
                label: item.name
            }
        })
        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: categoryConvert
        })
    } catch (error) {
        reject(error)
    }
})

const create = ({name}) => new Promise(async (resolve, reject) => {
    try {
        const [category, created] = await db.Category.findOrCreate({
            where: { name },
            default: { name }
        })

        if(!created) {
            resolve({
                erroCode: 1,
                mess: "Danh mục đã tồn tại"
            })
          } else {
            resolve({
                erroCode: 0,
                mess: "Thêm danh mục thành công",
                data: category
            })
          }

    } catch (error) {
        reject(error)
    }
})

const informationCategory = () => new Promise(async (resolve, reject) => {
    try {
        const listCategory = await db.Category.findAll();

        const listBookByCategory = await Promise.all(listCategory.map(async (category) => {
            const books = db.Book.findAll({
               where: {
                categoryId: category.id
               }
            });
            return books
        }));

        const listQuailityBook = await Promise.all(listBookByCategory.map(async (listBook) => {
            const listQuaility = await Promise.all(listBook.map(async (book) => {
                const reactionQuantity = db.QuantityInteraction.findOne({
                    where: {
                        bookId: book.id,
                    },
                    attributes: ["watchQuantity", "dislikeQuantity", "likeQuantity"]
                });
                
                return reactionQuantity
            }));
            
            return listQuaility
        }))

        const dataRes = listQuailityBook.map((e, index) => {
            let watchQuantity = 0;
            let dislikeQuantity = 0;
            let likeQuantity = 0;

            e.forEach(i => {
                watchQuantity += i.watchQuantity;
                dislikeQuantity += i.dislikeQuantity;
                likeQuantity += i.likeQuantity
            });
          
            return {
                id: listCategory[index].id,
                name: listCategory[index].name,
                bookQuantity: e.length,
                watchQuantity: watchQuantity,
                dislikeQuantity: dislikeQuantity,
                likeQuantity: likeQuantity,
            }
        })

        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: dataRes
        })
    } catch (error) {
        reject(error)
    }
})

module.exports = {create, getAll, informationCategory}