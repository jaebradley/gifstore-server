function handleErrors(error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(error.status).send({ message: error.message });
  }

  next();
}

export default handleErrors;
