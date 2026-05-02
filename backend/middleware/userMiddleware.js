const jwt = require("jsonwebtoken");
const USER_KEY = process.env.USER_JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Login required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, USER_KEY); 
    req.user = decoded;
    next();
    
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
