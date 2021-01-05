const { verifyToken } = require("../tokens/tokenService");

exports.verifyToken = async (req, res, next) => {
  console.log(req.cookies);
  const { cookies } = req;
  try {
    if (!cookies || !cookies.token) {
      res.status(403).json({ message: "authorization required" });
      return;
    }
    const token = cookies.token;
    const profileToken = await verifyToken(token);
    req.profile = profileToken;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
