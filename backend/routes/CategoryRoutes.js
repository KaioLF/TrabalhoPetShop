const express = require('express');
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");//importando o controller da categoria

// middlewares
const verifyToken = require("../helpers/check-token");
const { imageUpload } = require("../helpers/image-upload");


//rotas
router.post("/catRegister", CategoryController.register);//rota de cadastro da categoria
router.get("/categories", CategoryController.getAll);//rota de listar todos as categorias
router.get("/:id", CategoryController.getCategoryById);//rota de listar categoria por id
router.put("/:id", CategoryController.update);//rota para editar categoria
router.delete("/:id", CategoryController.deleteCategory);//rota para deletar categoria por id

module.exports = router;