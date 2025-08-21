// product.js
document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (product) {
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `₹${product.price}`;
    document.getElementById("product-description").textContent = product.description;
  } else {
    document.body.innerHTML = "<p>Product not found.</p>";
  }
});
