const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// helpers
const getUserByToken = require('../helpers/get-user-by-token');
const getToken = require('../helpers/get-token');
const createUserToken = require('../helpers/create-user-token');
//const { imageUpload } = require('../helpers/image-upload');

module.exports = class UserController {
  static async register(req, res) {
    //coisas do id
    var id = req.body.id
    const max = await User.findOne({}).sort({ id: -1 });
    id = max == null ? 1 : max.id + 1;
    //resto das propriedades do modelo
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;
    const cpf = req.body.cpf;
    const creditCard = req.body.creditCard
    const confirmpassword = req.body.confirmpassword;

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    };

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    };

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' })
      return
    };

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return
    };

    if(!address){
      res.status(422).json({message: 'O endereço é obrigatório!'})
    };

    if(!cpf){
      res.status(422).json({message: 'O CPF é obrigatório!'})
    };

    if(!creditCard){
      res.status(422).json({message: 'Os dados do cartão de crédito são obrigatórios!'})
    };
 
    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
      return
    }

    if (password != confirmpassword) {
      res
        .status(422)
        .json({ message: 'A senha e a confirmação precisam ser iguais!' })
      return
    }


    // check if user exists
    const userExists = await User.findOne({ cpf: cpf })

    if (userExists) {
      res.status(422).json({ message: 'CPF já cadastrado meu parceiro' })
      return
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    
    // create user
    const user = new User({
      id: id,
      name: name,
      email: email,
      password: passwordHash,
      phone: phone,
      address: address,
      cpf: cpf,
      creditCard: creditCard,
    })

    try {
      const newUser = await user.save()
      res.status(201).json({
        message: 'Cliente cadastrado com sucesso!',
        newUser: newUser,
    })

      await createUserToken(newUser, req, res)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao salvar cliente' })
    }
  }

  static async getAll(req, res) {
    try {
      const resultado = await User.find({});
      res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao listar os assinantes" });
    }
  }

  static async login(req, res) {
    const email = req.body.email
    const password = req.body.password

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' })
      return
    }

    // check if user exists
    const user = await User.findOne({ email: email })

    if (!user) {
      return res
        .status(422)
        .json({ message: 'Não há usuário cadastrado com este e-mail!' })
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return res.status(422).json({ message: 'Senha inválida' })
    }

    await createUserToken(user, req, res)
  }

  /*verifica se um usuário está autenticado com base no token de autorização fornecido e retorna 
  as informações do usuário (sem a senha) ou null se o usuário não estiver autenticado*/
  static async checkUser(req, res) {
    let currentUser

    console.log(req.headers.authorization)

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, 'nossosecret')

      currentUser = await User.findById(decoded.id)

      currentUser.password = undefined
    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) {
    const id = req.params.id

    const user = await User.findById(id)

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json({ user })
  }
  
  static async editUser(req, res) {
    const token = getToken(req)

    //console.log(token);

    const user = await getUserByToken(token)

    // console.log(user);
    // console.log(req.body)
    // console.log(req.file.filename)

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;
    const cpf = req.body.cpf;
    const creditCard = req.body.creditCard;
    const confirmpassword = req.body.confirmpassword;

    /*let image = ''

    if (req.file) {
      image = req.file.filename
    }*/

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    user.name = name;

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    // check if user exists
    const userExists = await User.findOne({ email: email })

    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    user.email = email;

     // check if password match
     if (password != confirmpassword) {
      res.status(422).json({ error: 'As senhas não conferem.' })

      // change password
    } else if (password == confirmpassword && password != null) {
      // creating password
      const salt = await bcrypt.genSalt(12)
      const reqPassword = req.body.password

      const passwordHash = await bcrypt.hash(reqPassword, salt)

      user.password = passwordHash;
    }

    /*if (image) {
      const imageName = req.file.filename
      user.image = imageName
    }*/

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return
    }

    user.phone = phone;

    if(!address){
      res.status(422).json({ message: 'O endereço é obrigatório!' })
    }

    user.address = address;

    if(!cpf){
      res.status(422).json({ message: 'O CPF é obrigatório!' })
    }

    user.cpf = cpf;

    if(!creditCard){
      res.status(422).json({ message: 'O cartão de crédito é obrigatório!' })
    }

    user.creditCard = creditCard;

    try {
      // returns updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      )
      res.json({
        message: 'Usuário atualizado com sucesso!',
        data: updatedUser,
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const _id = String((await User.findOne({ id: id }))._id);
      await User.findByIdAndRemove(String(_id));
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir o cliente" });
    }
  }
}