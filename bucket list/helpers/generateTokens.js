const jwt = require("jsonwebtoken");
const generateTokens = async (payload) => {
  try {
    console.log(payload);
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESSTOKEN_SECRET, {
      expiresIn: "90d",
    });
    return Promise.resolve({ accessToken });
  } catch (error) {
    console.log(error);
    return Promise.reject(err);
  }
};

const generateTempTokens = async (payload) => {
  try {
    const accessToken = jwt.sign(payload, process.env.JWT_TEMPTOKEN_SECRET, {
      expiresIn: "1d",
    });
    return Promise.resolve({ accessToken });
  } catch (error) {
    console.log(error);
    return Promise.reject(err);
  }
};

module.exports = { generateTokens, generateTempTokens };
