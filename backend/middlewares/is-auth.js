const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    if(decodedToken)
    {
        req.userData = { email: decodedToken.email, _id: decodedToken._id }; 
        
        next();
    }

  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
