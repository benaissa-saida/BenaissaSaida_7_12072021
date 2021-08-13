const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },// récupére le token avant de remplacer 'bearer' par rien.
  getUserId: function(authorization) {
    var userId = -1; // définit un user par défault 
    var token = module.exports.parseAuthorization(authorization);
    //on parse notre token grace au module fait précedemment 
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, process.env.TOKENSECRET);
        //verifie le token s'il est valid 
        if(jwtToken != null) // si non nul
          userId = jwtToken.userId; // on récupére userId
      } catch(err) { }
    }
    return userId;
  },
};

