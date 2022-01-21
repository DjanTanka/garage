const jwt = require("jsonwebtoken");

module.exports = generateToken = (a, b, c, exTime) => {
  if ((a, b)) {
    const token = jwt.sign(
      { userId: a, role: b },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: exTime,
      }
    );
    return token;
  }
  if (c) {
    const token = jwt.sign({ email: c }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: exTime,
    });
    return token;
  }
};
