const express = require('express');
const users = require('./data/users');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tournamentsRoutes = require('./routes/tournamentsRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const matchesRoutes = require('./routes/matchesRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// Route handlers
app.use('/api/users', userRoutes)
app.use('/api/tournaments', tournamentsRoutes)
app.use('/api/teams', teamsRoutes)
app.use('/api/matches', matchesRoutes)

// Deployment configuration
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
