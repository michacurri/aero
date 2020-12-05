const jwt = require("jsonwebtoken");

//* would need to be an ENV
const KEY = "I have ten toes";

// create a function that will generate a token using this secret
exports.createToken = (profile) => {
  // payload + header
  // mix it with KEY and generate the signature
  const token = jwt.sign(profile, KEY);
  return token;
};

exports.verifyToken = (token) => {
  let profile;
  //* taking signature from token
  //* generating an expected signature
  //* comparing the two
  jwt.verify(token, KEY, (err, decodedToken) => {
    //? decoded is
    if (err) {
      throw err;
    }
    profile = decodedToken;
  });

  //* more succint way of writing the code-block above
  //? const decoded = jwt.verify(token, KEY);

  return profile;
};
