const Product = require('../models/product.model');

async function createProduct(req, res) {
  try {
    const { name, quantity, price, image } = req.body || {};
    const product = await Product.create({ name, quantity, price, image });
    res.status(201).json(product);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: 'Could not save the product.' });
  }
}

async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not load products.' });
  }
}
async function updateProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports = { createProduct, getProducts, updateProduct, deleteProduct };