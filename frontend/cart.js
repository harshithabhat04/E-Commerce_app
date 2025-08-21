let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartDisplay() {
  const container = document.getElementById("cart-container");
  const totalSpan = document.getElementById("total-amount");
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalSpan.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h4>${item.name}</h4>
      <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
      <div>
        <button onclick="changeQty(${index}, -1)">➖</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${index}, 1)">➕</button>
        <button onclick="removeItem(${index})">❌ Remove</button>
      </div>
    `;
    container.appendChild(div);
  });

  totalSpan.textContent = total;
}

function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Remove item if quantity is 0
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

updateCartDisplay();
