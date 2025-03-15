const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("Authorization Header Received:", authHeader); 

  if (!authHeader) {
    console.log("No Authorization header found");
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token Verified:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT Verification Error:", err.message);
    return res.status(403).json({ error: 'Token is not valid or expired' });
  }
};

module.exports = authenticate;
