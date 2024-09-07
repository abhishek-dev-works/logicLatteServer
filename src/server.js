const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const jobsRoutes = require("./routes/jobsRoutes");
const postsRoutes = require("./routes/postsRoutes");
const friendsRoutes = require("./routes/friendsRoutes");
const path = require("path");
const http = require("http");
const socketService = require("./socket/socketService");
// Connect to the database
connectDB();

// Create an express application
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Create a server
const server = http.createServer(app);

socketService.initializeSocket(server);

// Serve static files from the "middleware/uploads" directory
app.use(
  "/middleware/uploads",
  express.static(path.join(__dirname, "middleware/uploads"))
);

// User routes
app.use("/api/users", userRoutes);

//Job routes
app.use("/api/jobs", jobsRoutes);

//Posts routes
app.use("/api/posts", postsRoutes);

//Friends Routes
app.use("/api/friends", friendsRoutes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
