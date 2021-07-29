const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, process.env.TOKENSECRET);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  },

  // code mis de côté 

  // getAuthorization: (req, res, next) => {
  //   let userId = -1
  //   try{
  //     const token = req.headers.authorization; 
  //     // on récupére les différentes données après le bearer 
  //     const decodedToken = jwt.verify(token, process.env.TOKENSECRET); 
  //     // On utilise la fonc verify pour décoder le token si pas valide => erreur
  //     userId = decodedToken.userId; // extraction de l'id user du token
  //     if(req.body.userId && req.body.userId != userId) { // on compare id user à celle du token
  //         throw 'User ID non valable !'; // Si différentes, on génére erreur
  //     }else{
  //         next(); // Sinon tout fonctionne et on passe la requête au prochain middleware
  //     }
  //   } catch (error){
  //       res.status(401).json({ error: error | 'Requête non authentifié !'})
  //   }
  // }
};

