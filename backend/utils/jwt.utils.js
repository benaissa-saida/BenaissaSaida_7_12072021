const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SIGN_SECRET = process.env.TOKENSECRET;

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({ // signe notre token (payload)
      userId: userData.id, //id user
    },
    JWT_SIGN_SECRET, // token secret
    {
      expiresIn: '24h' //expire au bout de 24h
    })
  }
} 
