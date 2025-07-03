const cart = [];
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalDisplay = document.getElementById("cart-total");
const closeCartBtn = document.getElementById("close-cart");

document.querySelectorAll("button[data-name]").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    updateCartCount();
  });
});

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.innerText = totalItems;
}

cartBtn.addEventListener("click", () => {
  renderCartItems();
  cartModal.style.display = "flex";
});

closeCartBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p><strong>${item.name}</strong><br>${item.qty} x Rp ${item.price}.000</p>
      <p style="color:#22c55e;">Rp ${itemTotal}.000</p>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotalDisplay.innerText = `Rp ${total}.000`;
}

function generateWhatsAppMessage() {
  if (cart.length === 0) {
    alert("Keranjang kosong.");
    return;
  }

  let message = "📢 *𝗣𝗘𝗦𝗔𝗡𝗔𝗡 𝗕𝗔𝗥𝗨 - 𝗗𝗘𝗠𝗢𝗡𝗭 𝗛𝗢𝗦𝗧𝗜𝗡𝗚* 📢%0A%0A";
  message += "𝗛𝗮𝗹𝗼 𝗔𝗱𝗺𝗶𝗻 𝗗𝗲𝗺𝗼𝗻𝘇 𝗛𝗼𝘀𝘁𝗶𝗻𝗴,%0A";
  message += "𝗦𝗮𝘆𝗮 𝗶𝗻𝗴𝗶𝗻 𝗺𝗲𝗺𝗲𝘀𝗮𝗻 𝗽𝗿𝗼𝗱𝘂𝗸 𝗯𝗲𝗿𝗶𝗸𝘂𝘁:%0A%0A";
  message += "📋 *𝗗𝗮𝗳𝘁𝗮𝗿 𝗣𝗲𝘀𝗮𝗻𝗮𝗻:*%0A";

  let total = 0;
  cart.forEach(item => {
    message += `➡️ *${item.name}* (${item.qty}x)%0A💵 𝗥𝗽 ${item.price * item.qty}.000%0A`;
    total += item.price * item.qty;
  });

  message += `%0A💰 *𝗧𝗼𝘁𝗮𝗹 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻:* 𝗥𝗽 ${total}.000%0A%0A`;
  message += "🛒 *𝗠𝗲𝘁𝗼𝗱𝗲 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻:*%0A";
  message += "𝟭. 𝗧𝗿𝗮𝗻𝘀𝗳𝗲𝗿 𝗕𝗮𝗻𝗸%0A";
  message += "𝟮. 𝗘-𝗪𝗮𝗹𝗹𝗲𝘁 (𝗢𝗩𝗢/𝗗𝗔𝗡𝗔/𝗚𝗼𝗣𝗮𝘆)%0A";
  message += "𝟯. 𝗤𝗥𝗜𝗦%0A%0A";
  message += "𝗠𝗼𝗵𝗼𝗻 𝗸𝗼𝗻𝗳𝗶𝗿𝗺𝗮𝘀𝗶 𝗸𝗲𝘁𝗲𝗿𝘀𝗲𝗱𝗶𝗮𝗮𝗻 𝗽𝗿𝗼𝗱𝘂𝗸 𝗱𝗮𝗻 𝗱𝗲𝘁𝗮𝗶𝗹 𝗽𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻.%0A𝗧𝗲𝗿𝗶𝗺𝗮 𝗸𝗮𝘀𝗶𝗵! 🙏";

  const phone = "628892119837";
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}
