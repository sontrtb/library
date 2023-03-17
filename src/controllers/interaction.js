const  interaction = require("../services/interaction");

const create = async (req, res) => {
    try {
        const {id} = req.user
        const data = {
            userId: id,
            reactionId: req.body.reactionId,
            bookId: req.body.bookId,
        }
        const response = await interaction.create(data)
        return res.status(200).json(response) 
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

module.exports = {create}