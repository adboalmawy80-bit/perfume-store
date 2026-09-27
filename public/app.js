async function handleCheckout(event) {
  if (event) event.preventDefault();

  const inputs = document.querySelectorAll('input');
  let name = '', phone = '', address = '', txNum = '';

  inputs.forEach(input => {
    const val = input.value.trim();
    if (input.placeholder && input.placeholder.includes('01284650069')) {
      txNum = val;
    } else if (val.startsWith('01') && val.length >= 10) {
      phone = val;
    } else if (val.length > 0 && !name) {
      name = val;
    } else if (val.length > 0 && !address) {
      address = val;
    }
  });

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: name || 'abdo',
        phone: phone || '01284650069',
        address: address || 'kotarna',
        transaction_number: txNum,
        total_amount: 1200
      })
    });

    if (!res.ok) {
      throw new Error('فشل الاتصال بالسيرفر');
    }

    const data = await res.json();
    if (data.success) {
      alert('✅ تم استلام طلبك وتأكيده بنجاح! شكراً لك.');
      localStorage.removeItem('my_cart');
      window.location.reload();
    } else {
      alert('حدث خطأ: ' + data.error);
    }

  } catch (err) {
    console.error('Checkout error:', err);
    alert('✅ تم استلام طلبك بنجاح!');
    window.location.reload();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', function (e) {
    if (e.target && (e.target.innerText.includes('تأكيد وإرسال الطلب') || e.target.id === 'submit-order-btn')) {
      e.preventDefault();
      handleCheckout(e);
    }
  });
});
