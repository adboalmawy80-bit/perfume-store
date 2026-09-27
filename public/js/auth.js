async function loginUser(email, password) {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if(data.success) {
    localStorage.setItem('token', data.data.token);
    window.location.href = '/';
  }
}
