const { check } = require("express-validator");
const validatorResults = require("../utils/handleValidator");
//hay que crear una validacion por cada objeto que queremos validar
//chequea que cada propiedad cuando se cree un item exista y no sea vacia

const validatorRegistrer = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }), //empty = vacio
  check("age").exists().notEmpty().isInt(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 6, max: 15 }),
  (req, res, next) => {
    //tiene que responder si es error o no
    return validatorResults(req, res, next);
  },
];
const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 6, max: 15 }),
  (req, res, next) => {
    //tiene que responder si es error o no
    return validatorResults(req, res, next);
  },
];
module.exports = { validatorRegistrer, validatorLogin };
