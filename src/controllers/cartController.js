const Cart = require('../models/Cart');
const Product = require('../models/Product');

// ????? ??? ?????
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cartItem = await Cart.findOne({ where: { userId, productId } });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    res.status(200).json({ success: true, data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ??? ??????? ?????
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      include: Product
    });
    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
