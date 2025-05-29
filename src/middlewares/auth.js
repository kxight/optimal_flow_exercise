const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
  
    if(!req.header("Authorization")) {
        return res.sendStatus(401);
    }
    
    const token = req.header("Authorization").replace("Bearer ", "");
  
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log('req.user', req.user);
        next();
      });
};



