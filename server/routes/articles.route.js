const express = require("express");
const articlesController = require("../controllers/articles.controller")
const router = express.Router();

{/* MIDDLEWARES */ }
const auth = require("../middlewares/auth")
const { addArticleValidator } = require('../middlewares/validation');

router.post("/", auth("createAny", "articles"), addArticleValidator, articlesController.createArticle)

module.exports = router