const { check } = require("express-validator");
const validatorResults = require("../utils/handleValidator");
//hay que crear una validacion por cada objeto que queremos validar
//chequea que cada propiedad cuando se cree un item exista y no sea vacia

const validatorGetItemById = [
  check("id").exists().notEmpty(), //empty = vacio

  (req, res, next) => {
    //tiene que responder si es error o no
    return validatorResults(req, res, next);
  },
];
module.exports = { validatorGetItemById };
