const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/session");
const {
  validatorCreateItem,
  validatorGetItemById,
} = require("../validator/tracksValidator");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracksController"); //destructuraicon
//aca generamos la ruta de canciones metodo get post delete update

//obtener una lista
router.get("/", authMiddleware, getItems);
//obtener track por id
router.get("/:id", validatorGetItemById, getItem);
//crear track
router.post("/", validatorCreateItem, createItem);
//actualizar
router.put("/:id", validatorGetItemById, validatorCreateItem, updateItem);
//eliminar
router.delete("/:id", validatorGetItemById, deleteItem);

module.exports = router;
