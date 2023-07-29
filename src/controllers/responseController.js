const errorResponse = (
  res,
  { statusCode = 500, message = 'Internal server Error' }
) => {
  return res.status(statusCode).json({ message, success: false });
};

const successResponse = (
  res,
  { statusCode = 200, message = 'Success', payload = {} }
) => {
  return res.status(statusCode).json({ message, success: true, payload });
};
module.exports = { errorResponse, successResponse };
