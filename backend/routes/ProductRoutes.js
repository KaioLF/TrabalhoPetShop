const router = require("express").Router();//importanto o router
const ProductController = require("../controllers/ProductController");//importando o controller da categoria

// middlewares
//const verifyToken = require("../helpers/check-token");
//const { imageUpload } = require("../helpers/image-upload");


//rotas
router.post("/prodRegister", ProductController.register);//rota de cadastro da categoria
router.get("/products", ProductController.getAll);//rota de listar todos as categorias
router.get("/:id", ProductController.getProductById);//rota de listar categoria por id
router.put("/:id", ProductController.update);//rota para editar usuário
router.delete("/:id", ProductController.deleteProduct);//rota para deletar usuário por id

module.exports = router;