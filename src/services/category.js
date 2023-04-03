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

module.exports = {create, getAll}