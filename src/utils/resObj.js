exports.success = (res, statusCode, data) => {
  return res.status(statusCode).json({
    status: 'success',
    results: data.length,
    data,
  });
};

exports.error = (res, statusCode, err) => {
  return res.status(statusCode).json({
    status: 'error',
    message: err.message,
  });
};

exports.fail = (res, statusCode, msg) => {
  return res.status(statusCode).json({
    status: 'fail',
    message: msg,
  });
};
