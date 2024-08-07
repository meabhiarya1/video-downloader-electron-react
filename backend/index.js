const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API endpoint example
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// All other requests should be handled by React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
