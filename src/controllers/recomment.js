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

const getTopInteractionUser = async (req, res) => {
    try {
        const userId =  req.params.userId;
        const response = await recoment.getTopInteractionUser(userId)
        return res.status(200).json(response) 
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

const getTopCategoryUser = async (req, res) => {
    try {
        const userId =  req.params.userId;
        const response = await recoment.getTopCategoryUser(userId)
        return res.status(200).json(response) 
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

const getPercentAll = async (req, res) => {
    try {
        const response = await recoment.getPercentAll()
        return res.status(200).json(response) 
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

const getPercentInteractionCategory = async (req, res) => {
    try {
        const response = await recoment.getPercentInteractionCategory()
        return res.status(200).json(response) 
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

const getPercentUserCategory = async (req, res) => {
    try {
        const response = await recoment.getPercentUserCategory()
        return res.status(200).json(response) 
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}


module.exports = {
    getTopInteraction,
    getTopInteractionUser,
    getPercentAll,
    getTopCategoryUser,
    getPercentInteractionCategory,
    getPercentUserCategory
}