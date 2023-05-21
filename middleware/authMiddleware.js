const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'Please, provide a token' });
  }
  const [, token] = req.headers.authorization.split(' ');

  jwt.verify(token, JWT_SECRET);

  return next();
};

module.exports = {
  authMiddleware,
};
