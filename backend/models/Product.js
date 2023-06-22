const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Um produto precisa ter: código, nome, imagem, descrição, preço, categoria (relacionamento), animal (sem relacionameto - “Cachorro”, ‘Gato“, etc), lista de comentários do produto (não precisa de relacionamento). 
Cada comentário precisa ter texto e nota. 
A nota geral do produto é a média das notas dos comentários.
 */

const Product = mongoose.model(
    'Product',
    new Schema({
      id: {
        type:Number,
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
      },
      price:{
        type: Number,
        required: true,
      },
      //arrumar
      category:{
        type: String,
        required: true,
      },
      animal:{
        type: String,
        required: true,
      },
      commentsList: [
        {
          comment: {
            type: String,
            required: true
          },
          rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
          }
        }
      ]
    }, {timestamps: true}),
  );
  
  module.exports = Product;