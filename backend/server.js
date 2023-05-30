const express = require('express');
const users = require('./data/users');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tournamentsRoutes = require('./routes/tournamentsRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const matchesRoutes = require('./routes/matchesRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');


const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.get('/api/user', (req, res) => {
//     res.json(users);
// });

app.use('/api/users', userRoutes)
app.use('/api/tournaments', tournamentsRoutes)
app.use('/api/teams', teamsRoutes)
app.use('/api/matches', matchesRoutes)

app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server started on port ${PORT}`));