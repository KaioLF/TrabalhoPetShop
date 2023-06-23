const Order = require("../models/Order");
const Product = require("../models/Product");
const Customer = require("../models/User")

module.exports = class OrderController {
  static async register(req, res) {
    const { id, totalPrice, products, customer, dateTime, status } = req.body;
  
    // Validações individuais
  
    if (!products) {
      res.status(422).json({ message: "O campo de produtos é obrigatório!" });
      return;
    }
  
    if (!customer) {
      res.status(422).json({ message: "O campo usuário é obrigatório!" });
      return;
    }
  
    if (!dateTime) {
      res.status(422).json({ message: "O campo de data e hora é obrigatório!" });
      return;
    }
  
    if (!status) {
      res.status(422).json({ message: "O campo 'status' é obrigatório!" });
      return;
    }
  
    // Validação do status
    const allowedStatus = ['Aguardando Pagamento', 'Padrão', 'Enviado', 'Cancelado', 'Faturado'];
    if (!allowedStatus.includes(status)) {
      res.status(422).json({ message: "O status fornecido é inválido!" });
      return;
    }
  
    const orderExists = await Order.findOne({ id: id });
    if (orderExists) {
      res.status(422).json({ message: "Pedido já existente!" });
      return;
    }
  
    // Verifica a existência dos produtos
    const productIds = products.map(product => product.product);
    const existingProducts = await Product.find({ id: { $in: productIds } });
    const existingProductIds = existingProducts.map(product => product.id);
    const nonExistingProductIds = productIds.filter(id => !existingProductIds.includes(id));
  
    if (nonExistingProductIds.length > 0) {
      return res.status(422).json({
        message: "Os seguintes produtos não existem:",
        nonExistingProductIds: nonExistingProductIds
      });
    }
  
    // Encontrar o cliente pelo nome
    const existingCustomer = await Customer.findOne({ name: customer });
  
    if (!existingCustomer) {
      res.status(404).json({ message: "Cliente não encontrado!" });
      return;
    }
  
    const order = new Order({
      id: id,
      totalPrice: totalPrice,
      products: products,
      customer: existingCustomer.name, // Atribuir o nome do cliente
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
    try {
      const id = req.params.id;
  
      const order = await Order.findOne({ id: id });
  
      if (!order) {
        return res.status(404).json({ message: 'Pedido não encontrado!' });
      }
  
      res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao obter pedido por ID" });
    }
  }

  static async getOrderByUser(req, res) {
    const customerName = req.params.name;
    console.log(customerName)
  
    // Verificar se o cliente existe
    const customer = await Customer.findOne({ name: customerName });
    console.log(customer.name);
  
    if (!customer.name) {
      res.status(404).json({ message: "Cliente não encontrado!" });
      return;
    }
  
    // Buscar pedidos do cliente pelo nome
    const orders = await Order.find({ customer: customer.name });
    console.log(orders);
  
    if (!orders || orders.length === 0) {
      res.status(404).json({ message: "Nenhum pedido encontrado para este cliente!" });
      return;
    }
  
    res.status(200).json({ orders });
  }

  static async update(req, res) {
    const { id, totalPrice, products, customer, dateTime, status } = req.body;

    // Validações individuais

    if (!products) {
      res.status(422).json({ message: "O campo de produtos é obrigatório!" });
      return;
    }

    if (!customer) {
      res.status(422).json({ message: "O campo usuário é obrigatório!" });
      return;
    }

    if (!dateTime) {
      res.status(422).json({ message: "O campo de data e hora é obrigatório!" });
      return;
    }

    if (!status) {
      res.status(422).json({ message: "O campo 'status' é obrigatório!" });
      return;
    }

    // Validação do status
    const allowedStatus = ['Aguardando Pagamento', 'Padrão', 'Enviado', 'Cancelado', 'Faturado'];
    if (!allowedStatus.includes(status)) {
      res.status(422).json({ message: "O status fornecido é inválido!" });
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
