const errorHandler = (error, request, response, next) => {
  return response.status(error.status || 500).json({ message: error.message });
};
module.exports = errorHandler;
