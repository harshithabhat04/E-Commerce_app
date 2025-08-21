
// Main function to load and display products
async function loadProducts(category = "", sortBy = "") {
  const container = document.getElementById("products");
  container.innerHTML = "";

  try {
    const res = await fetch("http://localhost:5000/api/products");
    const allProducts = await res.json();

    const filtered = category
      ? allProducts.filter(p => p.category === category)
      : allProducts;

    if (sortBy === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    filtered.forEach(product => {
  const div = document.createElement("div");
  div.className = "product-card";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-img" />
    <h4>${product.name}</h4>
    <p>₹${product.price}</p>
    <p>${product.description}</p>
    <button onclick="addToCart('${product._id}'); event.stopPropagation();" 
  style="background-color:#e0f0ff; color:#0066cc; border:1px solid #0066cc; padding:8px 12px; border-radius:6px; font-weight:bold;">
  🛒 Add to Cart
</button>
<br/>
<button onclick="addToWishlist('${product._id}'); event.stopPropagation();" 
  style="background-color:#ffe6ea; color:crimson; border:1px solid crimson; padding:8px 12px; border-radius:6px; font-weight:bold; margin-top:8px;">
  ❤️ Wishlist
</button>

  `;

      div.onclick = () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product.html";
      };
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load products", err);
    container.innerHTML = "<p>Failed to load products. Please try again later.</p>";
  }
}

// Sort products by price dropdown
function sortProducts() {
  const sortBy = document.getElementById("sortSelect").value;
  loadProducts("", sortBy);
}

// Search functionality
function searchProducts() {
  const query = document.querySelector(".search-bar input").value.toLowerCase();
  const container = document.getElementById("products");
  container.innerHTML = "";

  fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(products => {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
      } else {
        filtered.forEach(product => {
  const div = document.createElement("div");
  div.className = "product-card";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-img" />
    <h4>${product.name}</h4>
    <p>₹${product.price}</p>
    <p>${product.description}</p>
    <button onclick="addToCart('${product._id}'); event.stopPropagation();" 
      style="background-color:#e0f0ff; color:#0066cc; border:1px solid #0066cc; padding:8px 12px; margin-right:8px; border-radius:6px; font-weight:bold;">
      🛒 Add to Cart
    </button>
    <button onclick="addToWishlist('${product._id}'); event.stopPropagation();" 
      style="background-color:#ffe6ea; color:crimson; border:1px solid crimson; padding:8px 12px; border-radius:6px; font-weight:bold;">
      ❤️ Wishlist
    </button>
  `;

          div.onclick = () => {
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "product.html";
          };
          container.appendChild(div);
        });
      }
    });
}

// In-memory cart using localStorage
function addToCart(productId) {
  fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p._id === productId);
      if (product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(p => p._id === productId);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart.`);
      }
    });
}

// In-memory wishlist using localStorage
function addToWishlist(productId) {
  fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p._id === productId);
      if (product) {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        const exists = wishlist.find(p => p._id === productId);
        if (!exists) {
          wishlist.push(product);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          alert(`${product.name} added to wishlist.`);
        } else {
          alert(`${product.name} is already in your wishlist.`);
        }
      }
    });
}

// Load all products on homepage initially
window.onload = () => loadProducts();
