{/* MODELS */ }
const { Article } = require("../models/article")
const { ApiError } = require("../middlewares/apiError")
const httpStatus = require("http-status")

const addArticle = async(body) =>{

    try{
        const article = new Article({
            ...body,
             score: parseInt(body.score)
        })
        await article.save()
        return article

    }catch(err){
        throw err
    }

}



module.exports = {
    addArticle
    
}