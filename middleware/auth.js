const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization Required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).send({ message: "Authorization Required" });
  }

  req.user = payload;

  next();
};

module.exports = {
  authorize,
};