const express = require('express');
const users = require('./data/users');
const dotenv = require('dotenv');


const app = express();
dotenv.config();


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/api/users', (req, res) => {
    res.json(users);
});


app.get('/api/users/:id', (req, res) => {
    const user = users.find((u) => u._id === req.params.id);
    res.send(user);
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server started on port ${PORT}`));