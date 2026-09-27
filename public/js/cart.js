async function loadCart() {
  const token = localStorage.getItem('token');
  if(!token) return;
  
  const res = await fetch('http://localhost:5000/api/cart', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  console.log('Cart Items:', data);
}
