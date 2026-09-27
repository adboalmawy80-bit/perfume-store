const API_BASE_URL = 'http://localhost:5000/api';

async function fetchProducts() {
  const res = await fetch(`${API_BASE_URL}/products`);
  return await res.json();
}

async function addToCartAPI(productId, quantity = 1) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productId, quantity })
  });
  return await res.json();
}
