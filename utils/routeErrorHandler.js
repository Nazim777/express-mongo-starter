const routeErrorHandler = (_req, _res, next) => {
  const error = new Error("Route Not Found!");
  error.status = 404;
  next(error);
};

module.exports = routeErrorHandler;
