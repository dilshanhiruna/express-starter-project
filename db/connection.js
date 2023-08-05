// db/connection.js

// pc:begin: mongodb
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/blogdb"; // Replace with your MongoDB connection URI
const client = new MongoClient(uri);
// pc:end: mongodb

// pc:begin: mongoose
const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/blogdb"; // Replace with your MongoDB connection URI
// pc:end: mongoose

// pc:begin: mysql
const mysql = require("mysql2");
// pc:end: mysql

// pc:begin: mongoose
const connectDB = async () => {
try {
await mongoose.connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

console.log("Connected to MongoDB");
} catch (error) {
console.error("Error connecting to MongoDB:", error);
process.exit(1); // Exit the process with a failure code
}
};
// pc:end: mongoose

// pc:begin: mongodb
const connectDB = async () => {
  try {
    await client.connect();

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a failure code
  }
};
// pc:end: mongodb

// pc:begin: mysql
const connectDB = mysql.createConnection({
host: "localhost", // Replace with your MySQL host
user: "your_username", // Replace with your MySQL username
password: "your_password", // Replace with your MySQL password
database: "blogDB", // Replace with your MySQL database name
});

connectDB.connect((err) => {
if (err) {
console.error("Error connecting to MySQL:", err);
return;
}
console.log("Connected to MySQL");
});
// pc:end: mysql

module.exports = connectDB;
