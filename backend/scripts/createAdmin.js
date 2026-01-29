import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();
    
    const adminEmail = process.argv[2] || "admin@gadgethub.com";
    const adminPassword = process.argv[3] || "admin123";
    const adminName = process.argv[4] || "Admin User";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true
    });

    console.log("Admin user created successfully!");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
