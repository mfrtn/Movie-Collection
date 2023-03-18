require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME || "Express",
  PORT: process.env.PORT || 3002,
};
