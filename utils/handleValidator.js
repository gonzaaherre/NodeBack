const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next(); //continua hacia el controlador
  } catch (err) {
    res.status(403); //retorna error 403 que no es valido
    res.send({ errors: err.array() });
  }
};

module.exports = validateResult;
