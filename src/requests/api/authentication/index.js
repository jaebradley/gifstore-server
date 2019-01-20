function index(request, response, next) {
  response.statusCode = 400;
  response.json({
    message: 'Placeholder route',
  });
  next();
}

export default index;
