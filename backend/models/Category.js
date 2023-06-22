const mongoose = require('mongoose');
const { Schema } = mongoose;

// Exemplo: Transporte, Cosmético, Roupa, Comida, Brinquedo, etc
const Category = mongoose.model(
  'Category',
  new Schema({
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,        
    }
  }, { timestamps: true }),
);

module.exports = Category;
