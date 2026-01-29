import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import connectDB from "../config/db.js";

dotenv.config();

const products = [
  // Headphones
  {
    name: "Sony WH-1000XM4 Wireless Headphones",
    description: "Industry-leading noise cancellation with premium sound quality",
    price: 24990,
    category: "headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    countInStock: 15
  },
  {
    name: "Apple AirPods Pro",
    description: "Active noise cancellation with spatial audio",
    price: 19990,
    category: "headphones",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500",
    countInStock: 20
  },
  {
    name: "Bose QuietComfort 45",
    description: "Premium noise-cancelling headphones with comfort fit",
    price: 22990,
    category: "headphones",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
    countInStock: 12
  },
  {
    name: "JBL Tune 750BTNC",
    description: "Wireless over-ear headphones with active noise cancellation",
    price: 4999,
    category: "headphones",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500",
    countInStock: 25
  },

  // Smartwatch
  {
    name: "Apple Watch Series 9",
    description: "Advanced health features with always-on display",
    price: 41900,
    category: "smartwatch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    countInStock: 10
  },
  {
    name: "Samsung Galaxy Watch 6",
    description: "Premium smartwatch with advanced fitness tracking",
    price: 29999,
    category: "smartwatch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    countInStock: 15
  },
  {
    name: "Fitbit Versa 4",
    description: "Fitness-focused smartwatch with health insights",
    price: 19999,
    category: "smartwatch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    countInStock: 18
  },
  {
    name: "Garmin Forerunner 265",
    description: "GPS running watch with advanced training metrics",
    price: 44990,
    category: "smartwatch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    countInStock: 8
  },

  // Speakers
  {
    name: "Sonos Era 300",
    description: "Premium wireless speaker with spatial audio",
    price: 49990,
    category: "speakers",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    countInStock: 10
  },
  {
    name: "JBL Flip 6",
    description: "Portable Bluetooth speaker with powerful bass",
    price: 7999,
    category: "speakers",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    countInStock: 20
  },
  {
    name: "Bose SoundLink Flex",
    description: "Waterproof portable speaker with clear sound",
    price: 12990,
    category: "speakers",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    countInStock: 15
  },
  {
    name: "Marshall Acton III",
    description: "Classic design with powerful sound",
    price: 24990,
    category: "speakers",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    countInStock: 12
  },

  // Mobiles
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip and titanium design",
    price: 134900,
    category: "mobiles",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    countInStock: 8
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Flagship Android phone with S Pen and advanced camera",
    price: 124999,
    category: "mobiles",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    countInStock: 10
  },
  {
    name: "OnePlus 12",
    description: "Premium Android phone with fast charging",
    price: 64999,
    category: "mobiles",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    countInStock: 15
  },
  {
    name: "Google Pixel 8 Pro",
    description: "Pure Android experience with AI-powered features",
    price: 84999,
    category: "mobiles",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    countInStock: 12
  },
  {
    name: "Xiaomi 14 Pro",
    description: "Flagship specs at competitive price",
    price: 79999,
    category: "mobiles",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    countInStock: 18
  },

  // Laptops
  {
    name: "MacBook Pro 16-inch M3",
    description: "Powerful laptop for professionals and creators",
    price: 249900,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    countInStock: 5
  },
  {
    name: "Dell XPS 15",
    description: "Premium Windows laptop with OLED display",
    price: 149990,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    countInStock: 8
  },
  {
    name: "HP Spectre x360",
    description: "2-in-1 convertible laptop with premium design",
    price: 129990,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    countInStock: 10
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    description: "Business laptop with exceptional keyboard",
    price: 139990,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    countInStock: 7
  },
  {
    name: "ASUS ROG Zephyrus G16",
    description: "Gaming laptop with RTX 4070 graphics",
    price: 179990,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    countInStock: 6
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
