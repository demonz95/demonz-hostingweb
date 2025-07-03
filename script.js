let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const whatsappBtn = document.getElementById('whatsapp-checkout');

function toggleCart() {
  document.getElementById('cart-panel').classList.toggle('active');
}

document.querySelectorAll('.product-card button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement;
    const name = card.querySelector('h2').innerText;
    const priceText = card.querySelector('.price').innerText.replace(/[^\d]/g, '');
    const price = parseInt(priceText);
    const existing = cart.find(item => item.name === name);

    // Efek animasi
    showAddedEffect(btn);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCart();
  });
});

function showAddedEffect(button) {
  const msg = document.createElement('span');
  msg.innerText = '✔ Ditambahkan!';
  msg.style.position = 'absolute';
  msg.style.background = '#22c55e';
  msg.style.color = 'white';
  msg.style.padding = '4px 8px';
  msg.style.borderRadius = '6px';
  msg.style.fontSize = '12px';
  msg.style.zIndex = 999;
  msg.style.top = `${button.offsetTop - 30}px`;
  msg.style.left = `${button.offsetLeft}px`;
  msg.style.opacity = 1;
  msg.style.transition = 'all 0.6s ease';

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.style.transform = 'translateY(-20px)';
    msg.style.opacity = 0;
  }, 100);

  setTimeout(() => {
    msg.remove();
  }, 700);
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.innerHTML = `<strong>${item.name}</strong><br>${item.qty} x Rp ${item.price.toLocaleString('id-ID')}<hr style="border: 0.5px solid #333"/>`;
    cartItems.appendChild(itemEl);
    total += item.price * item.qty;
    itemCount += item.qty;
  });

  cartCount.innerText = itemCount;
  cartTotal.innerText = 'Total: Rp ' + total.toLocaleString('id-ID');

  // Update WhatsApp link
  let message = `📢 *PESANAN BARU - DEMONZ HOSTING* 📢\n\nHalo Admin,\nSaya ingin memesan produk berikut:\n\n`;

  cart.forEach(item => {
    message += `➡️ *${item.name}* (${item.qty}x)\n💵 Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n\n`;
  });

  message += `💰 *Total:* Rp ${total.toLocaleString('id-ID')}\n\nMohon konfirmasi ketersediaan dan cara pembayaran. Terima kasih!`;

  const encodedMsg = encodeURIComponent(message);
  whatsappBtn.href = `https://wa.me/628892119837?text=${encodedMsg}`;
}
