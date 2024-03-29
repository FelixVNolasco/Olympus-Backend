const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SEC_PASSJWT, (err, user) => {
      console.log(user);
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {

    console.log("+++++++++++++");
    console.log(req.user.id);
    console.log(req.params.id);
    console.log(req.query.id);
    console.log("+++++++++++++");
    if (req.user.id === req.params.id || req.user.id === req.query.id || req.user.isAdmin) {      
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};


module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}