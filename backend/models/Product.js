const mongoose = require('mongoose');
const { Schema } = mongoose;
const Category = require('./Category');

const CommentSchema = new Schema({
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
});

const ProductSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      /*required: false*/
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    animal: {
      type: String,
      required: true
    },
    commentsList: [CommentSchema]
  },
  { timestamps: true }
);

ProductSchema.virtual('generalRating').get(function () {
  if (this.commentsList.length === 0) {
    return 0;
  }

  const totalRating = this.commentsList.reduce((sum, comment) => sum + comment.rating, 0);
  const averageRating = totalRating / this.commentsList.length;
  return averageRating;
});

ProductSchema.methods.toJSON = function() {
  const product = this.toObject();
  product.generalRating = this.generalRating;
  return product;
};

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
