const { userService, userDao } = require("../api/index").userApp;
const { Role } = require("../database");

const JWT = require("jsonwebtoken");

const authJWT = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.includes("Bearer")
      ? authorization.split(" ")[1]
      : authorization;

    try {
      const { email } = JWT.verify(token, process.env.SECRET_KEY);
      const user = await userService.findByEmail(email);
      req.user = userDao.userInfoDao(user);
      next();
    } catch (error) {
      return res.status(401).json({
        error: true,
        message: "Invalid token!",
      });
    }
  } else {
    return res.status(401).json({
      error: true,
      message: "Put your token in header",
    });
  }
};

const admin = (req, res, next) => {
  if (!req.user) {
    throw new Error("We need use auth middleware first");
  }

  if (req.user.role === Role.ADMIN) {
    next();
  } else {
    const error = new Error();
    error.message = "You are not authorized";
    error.status = 401;
    next(error);
  }
};

const operator = (req, res, next) => {
  if (!req.user) {
    throw new Error("We need use auth middleware first");
  }

  if (req.user.role === Role.ADMIN || req.user.role === Role.OPERATOR) {
    next();
  } else {
    const error = new Error();
    error.message = "You are not authorized";
    error.status = 401;
    next(error);
  }
};

const self = (req, res, next) => {
  if (!req.user) {
    throw new Error("We need use authenticate user first");
  }
  if (req.user.role === Role.ADMIN || req.user.role === Role.OPERATOR) {
    next();
  } else if (
    req.user.role === Role.CLIENT &&
    Number(req.params.id) === req.user.id
  ) {
    next();
  } else {
    const error = new Error();
    error.message = "It's Forbidden";
    error.status = 403;
    next(error);
  }
};

module.exports = {
  authJWT,
  admin,
  operator,
  self,
};
