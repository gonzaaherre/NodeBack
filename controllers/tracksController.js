const { matchedData } = require("express-validator");
const { trackModel } = require("../models"); // Cambia a trackModel
const { handlehttpError } = require("../utils/handleError");

/**
 * obtener lista de la db
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    //si hay await hay async
    const data = await trackModel.find({}); // Busca todas las pistas en la base de datos
    res.send({ data }); // Envía los datos en la respuesta
  } catch (e) {
    handlehttpError(res, "ERROR_GET_ITEMS");
  }
};

/**
 * obtener detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = (req, res) => {};

/**
 * insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await trackModel.create(body);
    console.log(body);
    // Crea un nuevo registro en la base de datos con los datos recibidos
    res.send({ data }); // Envía los datos creados en la respuesta
  } catch (e) {
    handlehttpError(res, "ERROR_CREATE_ITEMS");
  }
};

/**
 * actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = (req, res) => {};

/**
 * eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = (req, res) => {};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }; // destructuracion
