const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => res.status(204).end());

// 1. قاعدة البيانات المؤقتة للمنتجات والطلبات
let products = [
  {
    id: 1,
    name: 'عود ملكي فاخر',
    price: 1200,
    cost: 800,
    stock: 15,
    image_url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500'
  }
];

let orders = [];

// 2. مسارات المنتجات (عرض للمتجر واللوحة)
app.get('/api/products', (req, res) => {
  res.status(200).json({ success: true, data: products });
});

app.post('/api/admin/products', (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

app.delete('/api/admin/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id != id);
  res.status(200).json({ success: true });
});

// 3. مسارات الطلبات ودفتر الدفع والربح
app.post('/api/orders', (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body,
    date: new Date()
  };
  orders.push(order);
  console.log('طلب جديد تم تسجيله في الدفتر:', order);
  res.status(200).json({ success: true, message: 'تم تسجل الطلب في الدفتر بنجاح' });
});

app.get('/api/admin/orders', (req, res) => {
  res.status(200).json({ success: true, data: orders });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 السيرفر شغال بنجاح على http://localhost:${PORT}`));

module.exports = app;
