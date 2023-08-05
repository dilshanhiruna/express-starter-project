// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const connectDB = require("./db/connection"); // Import the connectDB function
// pc:begin: express-rate-limit
const rateLimit = require("express-rate-limit");
// pc:end: express-rate-limit

const app = express();
const PORT = process.env.PORT || 5000;

// pc:begin: express-rate-limit
const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes (time window for rate limit)
max: 100, // maximum 100 requests per windowMs
});
app.use(limiter);
// pc:end: express-rate-limit

app.use(bodyParser.json());
app.use(cors());

// Register API routes
app.use("/api/posts", postRoutes);

// Call the connectDB function to establish the MongoDB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
