const category = require("../services/category");

const create = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name || name?.length === 0) return res.status(400).json({
            errCode: 1,
            mess: "Tên danh mục không hợp lệ"
        })

        const response = await category.create(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

module.exports = {create}