const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');

const { Schema } = mongoose;

const orderSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  totalPrice: {
    type: Number,
  },
  products: [{
    product: {
      type: String, // Alterado para String
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  customer: {
    type: String, // Alterado para String
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Aguardando Pagamento', 'Padrão', 'Enviado', 'Cancelado', 'Faturado'],
    required: true
  }
}, { timestamps: true });

orderSchema.pre('save', async function (next) {
  const order = this;

  try {
    const populatedOrder = await Order.findOne({ id: order.id })
      .populate('products.product')
      .exec();

    let totalPrice = 0;
    for (const product of populatedOrder.products) {
      totalPrice += product.product.price * product.quantity;
    }

    order.totalPrice = totalPrice;
  } catch (error) {
    console.error(error);
  }

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
