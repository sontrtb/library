const db = require("../models")

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

module.exports = {create}