const cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartPanel = document.getElementById('cart-panel');

function toggleCart() {
  cartPanel.classList.toggle('active');
}

document.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement;
    const name = card.querySelector('h2').innerText;
    const priceText = card.querySelector('.price').innerText.replace(/[^\d]/g, '');
    const price = parseInt(priceText);
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCart();
    showAddedNotification(name);
  });
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.innerHTML = `<strong>${item.name}</strong><br>${item.qty} x Rp ${item.price.toLocaleString()} <hr style="border: 0.5px solid #333"/>`;
    cartItems.appendChild(itemEl);
    total += item.price * item.qty;
    itemCount += item.qty;
  });

  cartCount.innerText = itemCount;
  cartTotal.innerText = 'Total: Rp ' + total.toLocaleString();
}

function showAddedNotification(itemName) {
  const notif = document.getElementById('added-notification');
  notif.innerText = `${itemName} ditambahkan ke keranjang`;
  notif.classList.add('show');

  setTimeout(() => {
    notif.classList.remove('show');
  }, 2000);
}

function pesanSekarang() {
  if (cart.length === 0) {
    alert("Keranjang kosong.");
    return;
  }

  let message = "📢 *PESANAN BARU - DEMONZ HOSTING* 📢%0A%0A";
  message += "Halo Admin Demonz Hosting,%0ASaya ingin memesan produk berikut:%0A%0A";
  message += "📋 *Daftar Pesanan:*%0A";

  let total = 0;
  cart.forEach(item => {
    message += `➡️ *${item.name}* (${item.qty}x)%0A💵 Rp ${item.price * item.qty}.000%0A`;
    total += item.price * item.qty;
  });

  message += `%0A💰 *Total Pembayaran:* Rp ${total}.000%0A`;
  message += `Metode pembayaran: Transfer / E-wallet / QRIS%0A%0A`;
  message += `Mohon konfirmasi ketersediaan dan detail pembayaran.`;

  const phone = "628892119837";
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}
