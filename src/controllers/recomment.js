const recoment = require("../services/recomment");

const getTopInteraction = async (req, res) => {
    try {
        const response = await recoment.getTopInteraction()
        return res.status(200).json(response) 
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

module.exports = {getTopInteraction}