const Product = require('../models/Product');
const Category = require('../models/Category');

// ??? ?? ??????
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ??? ??? ???? ?????????
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (!product) return res.status(404).json({ success: false, message: '????? ??? ?????' });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ????? ??? ???? (????????)
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
