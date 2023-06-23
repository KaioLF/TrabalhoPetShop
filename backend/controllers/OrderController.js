const Order = require("../models/Order");

module.exports = class OrderController {
  static async register(req, res) {
    const { id, totalPrice, products, customer, dateTime, status } = req.body;

    // Validações
    if (!id || !totalPrice || !products || !customer || !dateTime || !status) {
      res.status(422).json({ message: "Todos os campos são obrigatórios!" });
      return;
    }

    const orderExists = await Order.findOne({ id: id });
    if (orderExists) {
      res.status(422).json({ message: "Pedido já existente!" });
      return;
    }

    const order = new Order({
      id: id,
      totalPrice: totalPrice,
      products: products,
      customer: customer,
      dateTime: dateTime,
      status: status
    });

    try {
      const newOrder = await order.save();
      res.status(201).json({
        message: "Pedido cadastrado com sucesso!",
        newOrder: newOrder
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao salvar pedido!" });
    }
  }

  static async getAll(req, res) {
    const orders = await Order.find().sort("-createdAt");
    res.status(200).json({
      orders: orders
    });
  }

  static async getOrderById(req, res) {
    const id = req.params.id;

    const order = await Order.findById(id);

    if (!order) {
      res.status(422).json({ message: "Pedido não encontrado!" });
      return;
    }

    res.status(200).json({ order });
  }

  static async getByUser(req, res) {
    const customer = req.params.customer.name;

    const order = await Order.findOne({"customer.name": customer})

    if (!order) {
      res.status(422).json({ message: "O usuário desse pedido não foi encontrado!" });
      return;
    }

    res.status(200).json({ order });
  } 

  static async update(req, res) {
    const { id, totalPrice, products, customer, dateTime, status } = req.body;

    // Validações
    if (!id || !totalPrice || !products || !customer || !dateTime || !status) {
      res.status(422).json({ message: "Todos os campos são obrigatórios!" });
      return;
    }

    try {
      const order = await Order.findOneAndUpdate(
        { id: id },
        { totalPrice: totalPrice, products: products, customer: customer, dateTime: dateTime, status: status },
        { new: true }
      );

      if (!order) {
        res.status(422).json({ message: "Pedido não encontrado!" });
        return;
      }

      res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar pedido!" });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const id = req.params.id;
      await Order.findOneAndRemove({ id: id });
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir pedido!" });
    }
  }
};
