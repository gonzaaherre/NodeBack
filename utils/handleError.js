const handlehttpError = (res, error, msg) => {
  console.log("Error", msg, " ", error);
  res.status(500);
  res.send({ error: "ERROR" });
};
module.exports = { handlehttpError };
