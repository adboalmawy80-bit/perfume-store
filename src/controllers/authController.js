const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ????? ?????? ????
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ success: false, message: '?????? ?????????? ???? ??????' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email, role: user.role, token }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ????? ??????
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: '?????? ?????? ??? ?????' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '?????? ?????? ??? ?????' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email, role: user.role, token }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
