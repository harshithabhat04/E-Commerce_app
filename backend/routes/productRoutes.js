const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ Existing route: Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ Optional: Add products manually (keep this if needed)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch from MongoDB
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err });
  }
});

// 🆕 Temporary route: Insert sample products
router.get('/seed', async (req, res) => {
  await Product.deleteMany(); // optional – clear old data

  const sampleProducts = [
    {
      name: "Bluetooth Speaker",
      image: "https://www.boat-lifestyle.com/cdn/shop/files/Stone_SpinXPro_1_b3503890-50f6-4cd1-9138-0bd90874391e_1300x.png?v=1709717442",
      price: 1199,
      description: "Compact speaker with amazing sound",
      category: "electronics"
    },
    {
      name: "Wireless Mouse",
      image: "https://m.media-amazon.com/images/I/51vMo-pHZ5L.jpg",
      price: 699,
      description: "Ergonomic mouse with fast tracking",
      category: "electronics"
    },
    {
      name: "Smart LED Bulb",
      image: "https://m.media-amazon.com/images/I/71WLIU1EuBS.jpg",
      price: 599,
      description: "Change color with app or voice",
      category:"electronics"
    },
    {
    name: "Men's Cotton T-Shirt",
    image: "https://d2fy0k1bcbbnwr.cloudfront.net/Designs_Inners_and_Outers/Tshirts/Men/Men_Plain_Sunset_Orange_1.jpg",
    price: 299,
    description: "Comfort fit, available in all sizes",
    category: "men"
  },
  {
    name: "Women's Ethnic Kurti",
    image: "https://images.meesho.com/images/products/568183149/q81xz_512.jpg",
    price: 1599,
    description: "Elegant design, perfect for festivals",
    category: "dressing"
  },
  // 👶 Children Section
  {
    name: "Kids Dinosaur Print T-Shirt",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/009203946?fmt=auto&$background-off-white$&$rsp-pdp-port-320$",
    price: 499,
    description: "Soft cotton tee with cute dino print",
    category: "children"
  },
  {
    name: "Toy Car Set (Pack of 4)",
    image: "https://m.media-amazon.com/images/I/61akYPL4udL._UF1000,1000_QL80_.jpg",
    price: 499,
    description: "Mini metal cars for endless fun",
    category: "children"
  },
  {
    name: "Story Book - Panchatantra Tales",
    image: "https://cdn.exoticindia.com/images/products/original/books-2019-023/uay806.jpg",
    price: 199,
    description: "Colorful moral stories for children",
    category: "stationery"
  }

  ];

  await Product.insertMany(sampleProducts);
  res.send({ message: 'Sample products added!' });
});

module.exports = router;
