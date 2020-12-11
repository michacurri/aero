const { verifyToken } = require("../tokens/tokenService");

exports.verifyToken = async (req, res, next) => {
  const { cookies } = req;
  // console.log(req); 
  // console.log(cookies);
  try {
    if (!cookies || !cookies.token) {
      res.status(403).json({ message: "authorization required" });
      return;
    }
    const token = cookies.token;
    // {id: someUserId}
    const profileToken = await verifyToken(token);
    req.profile = profileToken;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
