const errorMiddleware = (error, _req, res, _next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal error';
  console.log(error);
  return res.status(status).json({ message });
};

module.exports = errorMiddleware;
