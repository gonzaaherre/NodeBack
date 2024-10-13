const handlehttpError = (res, message = "Algo sucedio", code = 403) => {
  res.status(code);
  res.res({ error: message });
};
module.exports = { handlehttpError };
