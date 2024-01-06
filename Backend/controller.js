const mongoose = require("mongoose");
const cors = require("cors");
const JWT = require("jsonwebtoken");
const port = process.env.PORT || 3001;
const { User, Product, Cart, Orders } = require("./Database.js");

const loginFunction = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ error: "Please fill all the fields" });
  }
  try {
    const isuser = await User.findOne({ email: email });
    if (isuser) {
      if (password === isuser.password) {
        const token = JWT.sign({ isuser }, "mbuys");
        res
          .status(200)
          .json({ message: "User logged in successfully", token: token });
      } else {
        return res.status(404).json({ error: "Wrong Password" });
      }
    } else {
      return res.status(404).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(404).json({ error: "Invalid credentials" });
  }
};

const Signupfunction = async (req, res) => {
  const { name, email, password, phoneno } = req.body;
  if (!name || !email || !password || !phoneno) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const isuser = await User.findOne({ email: email });

    if (isuser) {
      return res.status(422).json({ error: "User already exists" });
    }
    const user = new User({ name, email, password, phoneno });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
  }
};

const addProduct = async (req, res) => {
  const { name, price, quantity, description, image, category } = req.body;

  if (!name || !price || !quantity || !description || !image || !category) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    const product = new Product({
      name,
      price,
      quantity,
      description,
      image,
      category,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async (req, res) => {
  const allProducts = await Product.find();
  res.status(200).json({ products: allProducts });
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  const reqproduct = await Product.findById(id);

  if (reqproduct) {
    res.status(200).json(reqproduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

const addtocart = async (req, res) => {
  const productid = req.params.productid;

  const id = req.params.id;

  try {
    const productincart = await Product.findById(productid);
    const cart = await Cart.findOne({ user: id });

    if (!productincart) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!cart) {
      const newCart = new Cart({
        user: id,
        products: [
          { _id: productincart._id, quantity: 1, price: productincart.price },
        ],
      });
      await newCart.save();
    } else {
      const itemIndex = cart.products.findIndex((p) => p._id == productid);
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity++;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({
          _id: productincart._id,
          quantity: 1,
          price: productincart.price,
        });
      }
      await cart.save();
    }
    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

const deleteProductFromCart = async (req, res) => {
  const productid = req.params.productid;
  const id = req.params.id;

  try {
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({ message: "No Product is added" });
    }

    const productIndex = cart.products.findIndex((p) => p._id == productid);

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      res.status(200).json({ message: "Product removed from cart" });
    } else {
      res.status(404).json({ message: "Product not in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing product from cart" });
  }
};

const deleteAllProductFromCart = async (req, res) => {
  const id = req.params.id;

  try {
    await Cart.updateOne({ user: id }, { $set: { products: [] } });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing product from cart" });
  }
};

const Orderitem = async (req, res) => {
  const productid = req.params.productid;

  const id = req.params.id;

  try {
    const productinorder = await Product.findById(productid);
    const Order = await Orders.findOne({ user: id });

    if (!productinorder) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!Order) {
      const newOrder = new Orders({
        user: id,
        Orders: [
          { _id: productinorder._id, quantity: 1, price: productinorder.price },
        ],
      });
      await newOrder.save();
    } else {
      const itemIndex = Order.Orders.findIndex((p) => p._id == productid);
      if (itemIndex > -1) {
        let productItem = Order.Orders[itemIndex];
        productItem.quantity++;
        Order.Orders[itemIndex] = productItem;
      } else {
        Order.Orders.push({
          _id: productinorder._id,
          quantity: 1,
          price: productinorder.price,
        });
      }
      await Order.save();
    }
    res.status(200).json({ message: "Product added to Orders" });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to Orders" });
  }
};

const getcart = async (req, res) => {
  const id = req.params.id;
  const cart = await Cart.findOne({ user: id });

  if (!cart) {
    return res.status(202).json({ message: "No items added to cart" });
  }
  res.status(200).json(cart);
};

const getOrders = async (req, res) => {
  const id = req.params.id;
  const Order = await Orders.findOne({ user: id });

  if (!Order) {
    return res.status(202).json({ message: "No items added to Order" });
  }
  res.status(200).json(Order);
};

module.exports = {
  loginFunction,
  Signupfunction,
  addProduct,
  getProducts,
  getProduct,
  addtocart,
  getcart,
  deleteProductFromCart,
  Orderitem,
  getOrders,
  deleteAllProductFromCart,
};
