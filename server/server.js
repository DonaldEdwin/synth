const express = require('express');
require('dotenv').config();
const userController = require('./controllers/userController');
const app = express();

app.use(express.json());

// USER ROUTES
app.post('/users', userController.register);
app.post('/users/login', userController.login);
app.get('/users', userController.getAllUsers);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
