const router = require("express").Router();//importanto o router
const OrderController = require("../controllers/OrderController");//importando o controller da categoria

// middlewares
//const verifyToken = require("../helpers/check-token");
//const { imageUpload } = require("../helpers/image-upload");


//rotas
router.post("/orderRegister", OrderController.register);//rota de cadastro do pedido
router.get("/orders", OrderController.getAll);//rota de listar todos os pedidos
router.get("/:id", OrderController.getOrderById);//rota de listar pedido por id

//TODO getOrdersByUser
router.get("/user/:name", OrderController.getOrderByUser);//listar pedido por usuário

router.put("/:id", OrderController.update);//rota para editar pedido
router.delete("/:id", OrderController.deleteOrder);//rota para pedido por id

module.exports = router;