const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
} = require("../controllers/tracksController"); //destructuraicon
//aca generamos la ruta de canciones metodo get post delete update

//obtener una lista
router.get("/", getItems);
router.get("/:Id", getItem);
router.post("/", createItem);

module.exports = router;
