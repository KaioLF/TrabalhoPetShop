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
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

orderSchema.pre('save', async function (next) {
  const order = this;

  let totalPrice = 0;
  for (const product of order.products) {
    const populatedProduct = await order.populate('products.product').execPopulate();
    totalPrice += populatedProduct.products.product.price * product.quantity;
  }

  order.totalPrice = totalPrice;
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
