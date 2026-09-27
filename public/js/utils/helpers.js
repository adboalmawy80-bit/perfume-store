function formatPrice(price) {
  return `${parseFloat(price).toFixed(2)} ?.?`;
}

function checkAuth() {
  return !!localStorage.getItem('token');
}
