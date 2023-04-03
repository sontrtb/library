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

const getDatail = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await book.getDetail(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

const getInteraction = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await book.getInteraction(id)
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
    getDatail,
    create,
    deleteBook,
    getInteraction
}