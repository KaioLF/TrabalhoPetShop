const Product = require("../models/Product");

module.exports = class ProductController {
  static async register(req, res) {
    //coisas do id do produto
    var id = req.body.id;
    const max = await Product.findOne({}).sort({ id: -1 });
    id = max == null ? 1 : max.id + 1;
    //outras propriedades
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const animal = req.body.animal;
    const commentsList = req.body.commentsList;

    //validações
    if (!name) {
      res.status(422).json({ message: "O nome do produto é obrigatório!" });
      return;
    }

    if (!description) {
      res
        .status(422)
        .json({ message: "A descrição do produto é obrigatório!" });
      return;
    }

    if (!price) {
      res.status(422).json({ message: "O preço do produto é obrigatório!" });
      return;
    }

    if (!animal) {
      res.status(422).json({ message: "O animal do produto é obrigatório!" });
      return;
    }

    /*if (!) {
        res.status(422).json({ message: "O preço do produto é obrigatório!" });
        return;
      }*/

    const productExists = await Product.findOne({ name: name });
    if (productExists) {
      res.status(422).json({ message: "Produto já existente!" });
      return;
    }

    const product = new Product({
      id: id,
      name: name,
      description: description,
      price: price,
      category: category,
      animal: animal,
      commentsList: commentsList,
    });

    try {
      const newProduct = await product.save();
      res.status(201).json({
        message: "Produto cadastrado com sucesso!",
        newProduct: newProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao salvar produto" });
    }
  }

  static async getAll(req, res) {
    const products = await Product.find().sort("-createdAt");
    res.status(200).json({
      products: products,
    });
  }

  static async getProductById(req, res) {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      res.status(422).json({ message: "Produto não encontrado!" });
      return;
    }

    res.status(200).json({ user });
  }

  static async update(req, res) {
    const product = req.body;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const animal = req.body.animal;
    const commentsList = req.body.animal;

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome do produto é obrigatório!" });
      return;
    }

    product.name = name;

    if (!description) {
      res.status(422).json({ message: "A descrição do produto é obrigatória!" });
      return;
    }

    product.description = description;

    if (!price) {
      res.status(422).json({ message: "O preço é obrigatório!" });
      return;
    }

    product.price = price;

    if (!category){
        res.status(422).json({ message: "A categoria do produto é obrigatória!" });
        return;
    }

    product.category = category;

    if (!animal){
        res.status(422).json({ message: "O animal é obrigatório!" });
        return;
    }
    
    product.animal = animal;

    /*if (!commentsList){
        res.status(422).json({ message: "A categoria do produto é obrigatória!" });
        return;
    }
    product.commentsList = commentsList;*/
  }

  static async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const _id = String((await Product.findOne({ id: id }))._id);
      await Product.findByIdAndRemove(String(_id));
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir produto!" });
    }
  }
};
