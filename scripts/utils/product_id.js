const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Path to backend directory and file
const backendDir = path.resolve(__dirname, '../../backend');
const filePath = path.join(backendDir, 'products.json');

// Ensure backend directory exists
if (!fs.existsSync(backendDir)) {
  fs.mkdirSync(backendDir);
}

// Load existing products if available
let existingProducts = [];
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, 'utf-8');
  existingProducts = JSON.parse(data);
}

// 👉 ADD NEW PRODUCTS HERE
const newProducts = [
  {
    image: "images/products/hats/red-cap.jpg",
    name: "red-cap",
    keywords: ["red", "hat", "casual"]
  },
  {
    image: "images/products/shoes/black-sneakers.jpg",
    name: "black-sneakers",
    keywords: ["black", "shoes", "sneakers"]
  }
];

// Generate product entries
const generatedProducts = newProducts.map(product => ({
  id: uuidv4(),
  image: product.image,
  name: product.name,
  rating: {
    stars: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
    count: Math.floor(Math.random() * 200) + 10
  },
  priceCents: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000,
  keywords: product.keywords
}));

// Merge old and new
const updatedProducts = [...existingProducts, ...generatedProducts];

// Write merged list to file
fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));

console.log(`✅ ${newProducts.length} new products added. Total now: ${updatedProducts.length}`);



//run node scripts/utils/product_id.js//