const errorResponse = (
  res,
  { statusCode = 500, message = 'Internal server Error' }
) => {
  return res.status(statusCode).json({ message, success: false });
};


module.exports={errorResponse}