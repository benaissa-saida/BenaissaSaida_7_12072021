// Imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Variable Routes
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

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

// images in a static file
app.use("/images", express.static(path.join(__dirname, "images")));

//Config routes
app.use('/api/auth', loginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


// Export app
module.exports = app;