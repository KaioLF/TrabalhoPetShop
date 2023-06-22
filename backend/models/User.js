const mongoose = require('mongoose');
const { Schema } = mongoose

const User = mongoose.model(
  'User',
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
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    /*image: {
      type: String,
      required: true
    },*/
    phone: {
      type: String,
      required: true
    },
    address:{
      type: String,
      required: true
    },
    cpf:{
      type: Number,
      required: true,
      unique: true
    },
    creditCard: {
      name: {
        type: String
      },
      number: {
        type: Number
      },
      cvv: {
        type: Number
      }
    },
  }, {timestamps: true}),
)

module.exports = User