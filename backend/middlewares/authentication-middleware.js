const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports.authMiddleware = async (req, res, next) => {
  try {
      // Extract token from Authorization header
      const token = req.header("auth-token");
      
      if (!token) {
          return res.status(401).send({ message: "Token missing" });
      }
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded._id) {
          return res.status(401).send({ message: "Invalid token structure" });
      }
      
      // Find user by ID
      const user = await User.findById(decoded._id).select('-password');
     

      if (!user) {
          return res.status(401).send({ message: "User not found" });
      }
      
      req.user = user;
      next();
  } catch (err) {
      console.error('Authorization Error:', err.message);
      return res.status(401).send({ message: "Unauthorized" });
  }
};
