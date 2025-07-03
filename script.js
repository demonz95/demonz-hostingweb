let cart = [];

function addToCart(productName, price) {
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  updateCart();
  openCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const totalElement = document.getElementById('cart-total');

  cartItemsContainer.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    totalItems += item.quantity;

    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <strong>${item.name}</strong><br>
      ${item.quantity} x Rp ${item.price.toLocaleString()}<br>
      <span style="color: #22c55e;">Rp ${itemTotal.toLocaleString()}</span>
      <button onclick="removeFromCart('${item.name}')" style="margin-left: 10px; background-color: red; color: white; border: none; padding: 2px 6px; border-radius: 3px;">Hapus</button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  totalElement.textContent = `Rp ${total.toLocaleString()}`;
  cartCount.textContent = totalItems;
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  updateCart();
}

function toggleCart() {
  const cartPanel = document.getElementById('cart-panel');
  cartPanel.style.right = cartPanel.style.right === '0px' ? '-400px' : '0px';
}

function openCart() {
  const cartPanel = document.getElementById('cart-panel');
  cartPanel.style.right = '0px';
}
