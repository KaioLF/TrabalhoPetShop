const router = require("express").Router();//importanto o router

const UserController = require("../controllers/UserController");//importando o controller do User

// middlewares
const verifyToken = require("../helpers/check-token");
const { imageUpload } = require("../helpers/image-upload");

//rotas
router.post("/register", UserController.register);//rota de cadastro
router.post("/login", UserController.login);//rota de login
router.get("/users", UserController.getAll);//rota de listar todos os usuários
router.get("/:id", UserController.getUserById);//rota de listar usuário por id
router.get("/checkuser", UserController.checkUser);
router.patch("/edit/:id", /*verifyToken,*/ /*imageUpload.single("image"),*/ UserController.editUser);//rota para editar usuário
router.delete("/:id", UserController.deleteUser);//rota para deletar usuário por id

module.exports = router;