const express = require("express");
const router = express.Router();
const { uploadMiddleware } = require("../utils/handleStorage");
const { validatorGetItemById } = require("../validator/storageValidator");
const {
  createItem,
  getItem,
  deleteItem,
  getItems,
  updateItem,
} = require("../controllers/storageController");

// http:localhost/api/storage
//obtener todos los registros
router.get("/", getItems);
//obtener un solo registro
router.get("/:id", validatorGetItemById, getItem);
//crear un nuevo registro
router.post("/", uploadMiddleware.single("myfile"), createItem);
//eliminar
router.delete("/:id", validatorGetItemById, deleteItem);

module.exports = router;
