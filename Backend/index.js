const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const JWT = require("jsonwebtoken");
const port = process.env.PORT || 3001;
const User = require("./Database.js");

const {
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
} = require("./controller.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello from server");
});

app.post("/signup", Signupfunction);
app.post("/login", loginFunction);
app.post("/addproduct", addProduct);
app.get("/getproducts", getProducts);
app.get("/getproduct/:id", getProduct);
app.post("/addtocart/:productid/:id", addtocart);
app.post("/addtoOrder/:productid/:id", Orderitem);
app.get("/getcart/:id", getcart);
app.get("/getorders/:id", getOrders);
app.delete("/deletecart/:productid/:id", deleteProductFromCart);
app.delete("/deleteallcart/:id", deleteAllProductFromCart);

app.listen(port, async () => {
  await mongoose
    .connect("mongodb+srv://mbuys:mbuys@cluster0.dxrqqdn.mongodb.net/mbuys")
    .then(() => {
      console.log("Connected to DB");
    });
  console.log(`Server running on port ${port}`);
});
