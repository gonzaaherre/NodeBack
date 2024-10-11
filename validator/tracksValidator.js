const { check } = require("express-validator");
const validatorResults = require("../utils/handleValidator");
//hay que crear una validacion por cada objeto que queremos validar
//chequea que cada propiedad cuando se cree un item exista y no sea vacia
const validatorCreateItem = [
  check("name").exists().notEmpty(),
  check("album").exists().notEmpty(),
  check("cover").exists().notEmpty(),
  check("artist").exists().notEmpty(),
  check("artist.name").exists().notEmpty(),
  check("artist.nickname").exists().notEmpty(),
  check("artist.nationality").exists().notEmpty(),
  check("duration").exists().notEmpty(),
  check("duration.start").exists().notEmpty(),
  check("duration.end").exists().notEmpty(),
  check("MediaId").exists().notEmpty().isMongoId(),

  (req, res, next) => {
    //tiene que responder si es error o no
    console.log("media " + req.body.MediaId); // Log del valor recibido
    return validatorResults(req, res, next);
  },
];

module.exports = { validatorCreateItem };
