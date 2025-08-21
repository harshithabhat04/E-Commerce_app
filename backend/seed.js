const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const sampleProducts = [
  {
    name: "Women's Ethnic Kurti",
    image: "https://images.meesho.com/images/products/568183149/q81xz_512.jpg",
    price: 1599,
    description: "Elegant design, perfect for festivals",
    category: "dressing"
  },
  {
    name: "Bluetooth Speaker",
    image: "https://www.boat-lifestyle.com/cdn/shop/files/Stone_SpinXPro_1_b3503890-50f6-4cd1-9138-0bd90874391e_1300x.png?v=1709717442",
    price: 1199,
    description: "Compact speaker with amazing sound",
    category: "electronics"
  },
  {
    name: "Toy Car Set (Pack of 4)",
    image: "https://m.media-amazon.com/images/I/61akYPL4udL._UF1000,1000_QL80_.jpg",
    price: 499,
    description: "Mini metal cars for endless fun",
    category: "kids"
  }
  // Add more if needed
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("MongoDB seeding error:", err);
    mongoose.disconnect();
  });
