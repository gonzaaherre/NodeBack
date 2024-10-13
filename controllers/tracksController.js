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
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await trackModel.findById(id); // Busca todas las pistas en la base de datos
    res.send({ data }); // Envía los datos en la respuesta
  } catch {
    handlehttpError(res, "ERROR_GET_ITEM");
  }
};

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
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //separa el id del body, quedando dos arreglos separados
    // Actualiza el documento y devuelve el nuevo documento actualizado
    const data = await trackModel.findOneAndUpdate(
      { _id: id }, // Objeto de búsqueda, aquí se filtra por ID
      body, // Campos que serán actualizados
      { new: true } // Opción para devolver el documento actualizado
    );
    console.log(body);
    // Crea un nuevo registro en la base de datos con los datos recibidos
    res.send({ data }); // Envía los datos creados en la respuesta
  } catch (e) {
    handlehttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

/**
 * eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await trackModel.deleteOne({ _id: id }); // Busca todas las pistas en la base de datos
    res.send({ data }); // Envía los datos en la respuesta
  } catch (e) {
    console.log(e);
    handlehttpError(res, "ERROR_GET_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }; // destructuracion
