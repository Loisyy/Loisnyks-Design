const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Ensure "backend" directory exists
const backendDir = './backend';
if (!fs.existsSync(backendDir)) {
  fs.mkdirSync(backendDir);
}

// Number of products to generate
const numberOfProducts = 5;

// Example product data (customize as needed)
const productTemplates = [
  {
    image: "images/products/2 piece/green-2piece.jpg",
    name: "green-2piece",
    keywords: ["green", "trouser", "apparel"]
  },
  {
    image: "images/products/dresses/red-dress.jpg",
    name: "red-dress",
    keywords: ["red", "dress", "fashion"]
  },
  {
    image: "images/products/jumpsuit/blue-jumpsuit",
    name: "blue-jumpsuit",
    keywords: ["blue", "jumpsuit", "fashion"]
  },
  {
    image: "images/products/pants/peach-layer-short",
    name: "peach-short",
    keywords: ["short", "peach", "casual"]
  },
  {
    image: "images/products/tops/zebra-shirt",
    name: "white-shirt",
    keywords: ["white", "shirt", "formal"]
  }
];

// Generate products
let products = productTemplates.slice(0, numberOfProducts).map((product) => ({
  id: uuidv4(),
  image: product.image,
  name: product.name,
  rating: {
    stars: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Random rating 3.5 - 5
    count: Math.floor(Math.random() * 200) + 10 // Random review count 10 - 200
  },
  priceCents: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000, // Random price between 10.00 - 50.00
  keywords: product.keywords
}));

// Save to backend/products.json
const filePath = `${backendDir}/products.json`;
fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

console.log(`Generated ${numberOfProducts} products and saved them in ${filePath}`);
//node product_id.js


// If you want to add new products to your existing list instead of overwriting products.json, you need to modify your script so that it appends new products instead of replacing them.

// Solution: Modify Your Script to Append New Products
// Your current script replaces all products each time you run it. To add new products, modify it like this:

// const { v4: uuidv4 } = require('uuid');
// const fs = require('fs');

// const backendDir = './backend';
// const filePath = `${backendDir}/products.json`;

// // Ensure "backend" directory exists
// if (!fs.existsSync(backendDir)) {
//   fs.mkdirSync(backendDir);
// }

// // Load existing products if the file exists
// let existingProducts = [];
// if (fs.existsSync(filePath)) {
//   const data = fs.readFileSync(filePath, 'utf-8');
//   existingProducts = JSON.parse(data);
// }

// // New products to add
// const newProducts = [
//   {
//     image: "images/products/shoes/black-sneakers.jpg",
//     name: "black-sneakers",
//     keywords: ["black", "shoes", "sneakers"]
//   },
//   {
//     image: "images/products/hats/red-cap.jpg",
//     name: "red-cap",
//     keywords: ["red", "hat", "casual"]
//   }
// ];

// // Generate new product objects with unique IDs
// const generatedProducts = newProducts.map((product) => ({
//   id: uuidv4(),
//   image: product.image,
//   name: product.name,
//   rating: {
//     stars: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Random rating 3.5 - 5
//     count: Math.floor(Math.random() * 200) + 10 // Random review count 10 - 200
//   },
//   priceCents: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000, // Random price between 10.00 - 50.00
//   keywords: product.keywords
// }));

// // Combine old and new products
// const updatedProducts = [...existingProducts, ...generatedProducts];

// // Save updated list to backend/products.json
// fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));

// console.log(`Added ${newProducts.length} new products. Total products: ${updatedProducts.length}`);
// Steps to Use This Script
// Edit the newProducts array in the script to add your new items.

// Run the script using:

// bash
// Copy
// Edit
// node product_id.js
// Your new products will be added to products.json instead of replacing the old ones.