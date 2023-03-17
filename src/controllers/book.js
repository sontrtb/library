const book  = require("../services/book");

const getAll = async (req, res) => {
    try {
        const response = await book.getAll()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

const create = async (req, res) => {
    try {
        const response = await book.create(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await book.deleteBook(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

module.exports =  {
    getAll,
    create,
    deleteBook
}