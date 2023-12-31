const Category = require("../models/Category"); //testqando

class CategoryController {
  static async register(req, res) {
    try {
      // Get the maximum id value
      const maxCategory = await Category.findOne({}, {}, { sort: { id: -1 } });
      var id = maxCategory ? maxCategory.id + 1 : 1;

      const { name, description } = req.body;

      // Validations
      if (!name) {
        return res.status(422).json({ message: "O nome da categoria é obrigatório!" });
      }

      if (!description) {
        return res.status(422).json({ message: "A descrição da categoria é obrigatória!" });
      }

      const categoryExists = await Category.findOne({ name });
      if (categoryExists) {
        return res.status(422).json({ message: "Categoria já existente!" });
      }

      const category = new Category({
        id,
        name,
        description,
      });

      const newCategory = await category.save();
      res.status(201).json({
        message: "Categoria cadastrada com sucesso!",
        newCategory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao salvar categoria" });
    }
  }

  static async getAll(req, res) {
    try {
      const categories = await Category.find().sort("-createdAt");
      res.status(200).json({
        categories,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao listar categorias" });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const id = req.params.id;

      const category = await Category.findOne({id: id});

      if (!category) {
        return res.status(404).json({ message: 'Categoria não encontrada!' });
      }

      res.status(200).json({ category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao obter categoria por ID" });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const { name, description } = req.body;
  
      // Validations
      if (!name) {
        return res.status(422).json({ message: "O nome da categoria é obrigatório!" });
      }
  
      if (!description) {
        return res.status(422).json({ message: "A descrição da categoria é obrigatória!" });
      }
  
      const category = await Category.findOne({ id: id });
  
      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada!" });
      }
  
      category.name = name;
      category.description = description;
  
      const updatedCategory = await category.save();
  
      res.status(200).json({ message: "Categoria atualizada com sucesso!"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar a categoria!" });
    }
  }
  

  static async deleteCategory(req, res) {
    try {
      const id = req.params.id;

      const category = await Category.findOne({id: id});

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada!" });
      }

      await Category.deleteOne({id: id});

      res.status(200).json({ message: "Categoria excluída com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir categoria!" });
    }
  }
}

module.exports = CategoryController;
