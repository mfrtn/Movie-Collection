const errorHandler = (error, req, res, next) => {
  if (error.status || error.statusCode) {
    res
      .status(error.status || error.statusCode)
      .json({
        error: {
          status: true,
          code: error.status || error.statusCode,
          error: error.name || error.error,
          message: error.message,
        },
      })
      .end();
  } else {
    return next(error);
  }
};

module.exports = { errorHandler };
