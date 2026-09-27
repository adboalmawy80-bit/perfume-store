let cart = [];
let productsData = [];

async function loadProducts() {
  const res = await fetch('/api/products');
  const result = await res.json();
  if (result.success) {
    productsData = result.data;
    document.getElementById('products-container').innerHTML = result.data.map(p => `
      <div class="card">
        <img src="${p.image_url}" alt="${p.name}">
        <div class="card-body">
          <h3>${p.name}</h3>
          <p style="color:#777;">${p.brand} | ${p.category_name}</p>
          <p style="margin: 8px 0; font-size: 0.85em;">${p.description}</p>
          <p class="price">${p.price} ج.م</p>
          <button class="btn" onclick="addToCart(${p.id})">إضافة للسلة 🛒</button>
        </div>
      </div>
    `).join('');
  }
}

function addToCart(id) {
  const product = productsData.find(p => p.id === id);
  cart.push(product);
  document.getElementById('cart-count').innerText = cart.length;
}

function openCart() {
  const itemsContainer = document.getElementById('cart-items');
  let total = 0;
  itemsContainer.innerHTML = cart.map(item => {
    total += parseFloat(item.price);
    return `<div style="border-bottom:1px solid #eee; padding:4px 0;">${item.name} - <strong>${item.price} ج.م</strong></div>`;
  }).join('');
  
  document.getElementById('cart-total').innerText = `الإجمالي: ${total} ج.م`;
  document.getElementById('cart-modal').style.display = 'flex';
}

function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

function togglePaymentInfo() {
  const method = document.getElementById('payment-method').value;
  document.getElementById('wallet-info').style.display = method === 'wallet' ? 'block' : 'none';
  document.getElementById('fawry-info').style.display = method === 'fawry' ? 'block' : 'none';
}

async function submitOrder(e) {
  e.preventDefault();
  if(cart.length === 0) return alert('السلة فارغة!');

  const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const orderData = {
    customerName: document.getElementById('cust-name').value,
    phone: document.getElementById('cust-phone').value,
    address: document.getElementById('cust-address').value,
    paymentMethod: document.getElementById('payment-method').value,
    transactionRef: document.getElementById('wallet-tx').value || 'N/A',
    cartItems: cart,
    totalAmount
  };

  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  
  const result = await res.json();
  if(result.success) {
    alert(result.message);
    cart = [];
    document.getElementById('cart-count').innerText = '0';
    closeCart();
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
