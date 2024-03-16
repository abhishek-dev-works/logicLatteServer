const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const postsRoutes = require("./routes/postsRoutes");
const friendsRoutes = require("./routes/friendsRoutes");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// User routes
app.use("/api/users", userRoutes);

//Skills routes
app.use("/api/skills", skillsRoutes);

//Posts routes
app.use("/api/posts", postsRoutes);

//Friends Routes
app.use("/api/friends", friendsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
