const authService = require("./auth.service");
const { userService } = require("../user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    const saltRounds = 10;

    const validUser = req.body;
    try {
      const oldUser = await userService.findByEmail(validUser.email);

      if (!oldUser) {
        const hashedPassword = bcrypt.hashSync(validUser.password, saltRounds);
        validUser.password = hashedPassword;
        newUser = await authService.create(validUser);
        return res.status(201).json({
          id: newUser.id,
        });
      } else {
        return res.status(406).json({
          error: true,
          message: "This email is taken by another user",
        });
      }
    } catch (error) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  },

  login: async (req, res) => {
    const validCredential = req.body;

    try {
      const user = await userService.findByEmail(validCredential.email);
      if (user) {
        if (bcrypt.compareSync(validCredential.password, user.password)) {
          const token = jwt.sign(
            { email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: Number(process.env.TOKEN_EXPIRE_TIME) }
          );
          return res.status(202).json({
            token,
          });
        }
      }
      return res.status(401).json({
        error: true,
        message: "Email and password doesn't match",
      });
    } catch (error) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  },

  logout: async (req, res) => {},
};

module.exports = authController;
