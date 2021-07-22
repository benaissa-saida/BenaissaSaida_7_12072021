// Imports
const express = require('express');
const bodyParser = require('body-parser');

// Variable Routes
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');

// Instantiate server
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Parser du JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure routes
app.use('/api/auth', loginRoutes);
app.use('/api/users', userRoutes);


// Export app
module.exports = app;