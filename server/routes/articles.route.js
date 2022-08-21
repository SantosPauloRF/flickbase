const express = require("express");
const articlesController = require("../controllers/articles.controller")
const router = express.Router();

{/* MIDDLEWARES */ }
const auth = require("../middlewares/auth")
const { addArticleValidator } = require('../middlewares/validation');

router.post("/", auth("createAny", "articles"), addArticleValidator, articlesController.createArticle)

router.route("/article/:id")
.get(auth("readAny", "articles"), articlesController.getArticleById)
.patch(auth("updateAny", "articles"), articlesController.updateArticleById)
.delete(auth("deleteAny", "articles"), articlesController.deleteArticleById)

router.route("/users/article/:id")
.get(articlesController.getUserArticleById)

router.route("/all")
.get(articlesController.getAllArticles)
.post(articlesController.getMoreArticles)

router.post("/admin/paginate", auth("readAny", "articles"), articlesController.adminPaginate)



module.exports = router