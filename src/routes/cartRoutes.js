const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.route('/')
  .get(getCart)
  .post(addToCart);

module.exports = router;
