const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  phoneno: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{8}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

const products = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    require: true,
  },
});

const CartSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      quantity: Number,
      price: Number,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const OrdersSchema = new mongoose.Schema({
  Orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      quantity: Number,
      price: Number,
    },
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", products);
const Cart = mongoose.model("Cart", CartSchema);
const Orders = mongoose.model("Orders", OrdersSchema);

module.exports = { User, Product, Cart, Orders };
