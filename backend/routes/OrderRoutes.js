const router = require("express").Router();//importanto o router
const OrderController = require("../controllers/OrderController");//importando o controller da categoria

// middlewares
//const verifyToken = require("../helpers/check-token");
//const { imageUpload } = require("../helpers/image-upload");


//rotas
router.post("/orderRegister", OrderController.register);//rota de cadastro da categoria
router.get("/orders", OrderController.getAll);//rota de listar todos as categorias
router.get("/:id", OrderController.getOrderById);//rota de listar categoria por id

//TODO getOrdersByUser

router.put("/:id", OrderController.update);//rota para editar usuário
router.delete("/:id", OrderController.deleteOrder);//rota para deletar usuário por id

module.exports = router;