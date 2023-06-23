const Product = require("../models/Product");
const Category = require('../models/Category');


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
    try {
      const id = req.params.id;

      const product = await Product.findOne({id: id});

      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado!' });
      }

      res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao obter produto por ID" });
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const { name, description, price, categoryName, animal } = req.body;
  
    // Validations
    if (!name) {
      return res.status(422).json({ message: "O nome do produto é obrigatório!" });
    }
  
    if (!description) {
      return res.status(422).json({ message: "A descrição do produto é obrigatória!" });
    }
  
    if (!price) {
      return res.status(422).json({ message: "O preço é obrigatório!" });
    }
  
    if (!categoryName) {
      return res.status(422).json({ message: "A categoria do produto é obrigatória!" });
    }
  
    if (!animal) {
      return res.status(422).json({ message: "O animal é obrigatório!" });
    }
  
    try {
      // Find the product by ID
      const product = await Product.findOne({ id });
  
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado!" });
      }
  
      // Find the category by name
      const categoryObj = await Category.findOne({ name: categoryName });
  
      if (!categoryObj) {
        return res.status(404).json({ message: "Categoria não encontrada!" });
      }
  
      // Perform the update
      product.name = name;
      product.description = description;
      product.price = price;
      product.category = categoryObj.id; // Use o ID personalizado da categoria
  
      const updatedProduct = await product.save();
  
      res.status(200).json({ product: updatedProduct, message: "Produto atualizado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar o produto!" });
    }
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
