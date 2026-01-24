const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const cors = require("cors");
const Jwt = require("jsonwebtoken");

const jwtKey = "e-comm";

const app = express();

// 🔹 Enable CORS for all origins (phone + laptop)
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// 🔹 Register user
app.post("/register", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        return res.status(500).send({
          result: "Something went wrong. Please try again later.",
        });
      }
      res.send({ result, auth: token });
    });
  } catch (err) {
    res.status(500).send({ result: "Registration failed" });
  }
});

// 🔹 Login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ result: "Email & password required" });

    let user = await User.findOne({ email, password }).select("-password");
    if (!user) return res.status(404).send({ result: "User not found" });

    Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err)
        return res
          .status(500)
          .send({ result: "Something went wrong. Try again later." });
      res.send({ user, auth: token });
    });
  } catch (err) {
    res.status(500).send({ result: "Login failed" });
  }
});

// 🔹 Middleware to verify JWT
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) return res.status(401).send({ result: "Invalid token" });
      next();
    });
  } else {
    res.status(403).send({ result: "Token missing in headers" });
  }
}

// 🔹 Add product
app.post("/add-product", verifyToken, async (req, res) => {
  try {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({ result: "Failed to add product" });
  }
});

// 🔹 Get all products
app.get("/products", verifyToken, async (req, res) => {
  try {
    let products = await Product.find();
    if (products.length > 0) res.send(products);
    else res.send({ result: "No data found" });
  } catch (err) {
    res.status(500).send({ result: "Failed to fetch products" });
  }
});

// 🔹 Delete product
app.delete("/product/:id", verifyToken, async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (err) {
    res.status(500).send({ result: "Delete failed" });
  }
});

// 🔹 Get single product
app.get("/product/:id", verifyToken, async (req, res) => {
  try {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) res.send(result);
    else res.send({ result: "No record found" });
  } catch (err) {
    res.status(500).send({ error: "Invalid Product ID" });
  }
});

// 🔹 Update product
app.put("/product/:id", verifyToken, async (req, res) => {
  try {
    let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(result);
  } catch (err) {
    res.status(500).send({ result: "Update failed" });
  }
});

// 🔹 Search products
app.get("/search/:key", verifyToken, async (req, res) => {
  try {
    const result = await Product.find({
      $or: [
        { name: { $regex: req.params.key, $options: "i" } },
        { category: { $regex: req.params.key, $options: "i" } },
        { company: { $regex: req.params.key, $options: "i" } },
      ],
    });
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: "Search failed" });
  }
});

// 🔹 Listen on all network interfaces
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on http://0.0.0.0:5000");
});
