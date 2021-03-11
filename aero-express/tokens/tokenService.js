const jwt = require("jsonwebtoken");

//* would need to be an ENV
const KEY = "I have ten toes";

exports.createToken = (profile) => {
  const token = jwt.sign(profile, KEY);
  return token;
};

exports.verifyToken = (token) => {
  let profile;
  jwt.verify(token, KEY, (err, decodedToken) => {
    if (err) {
      throw err;
    }
    profile = decodedToken;
  });
  return profile;
};
