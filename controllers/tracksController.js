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
    const user = req.user;
    //si hay await hay async
    const data = await trackModel.findAllData(); // Busca todas las pistas en la base de datos
    res.send({ data, user }); // Envía los datos en la respuesta
  } catch (e) {
    handlehttpError(res, "ERROR_GET_TRACKS");
    console.log(e);
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
    const data = await trackModel.findOneData(id); // Busca todas las pistas en la base de datos
    if (!data) {
      return handlehttpError(res, "ITEM_NOT_FOUND");
    }
    res.send({ data }); // Envía los datos en la respuesta
  } catch (e) {
    handlehttpError(res, e, "ERROR_GET_ITEM");
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
    const { id, ...restOfData } = matchedData(req); // Extrae el id y los datos restantes
    const [updated] = await trackModel.update(restOfData, {
      where: { id }, // Condición para actualizar
    });

    if (updated) {
      const updatedTrack = await trackModel.findByPk(id); // Busca el track actualizado
      return res.send({ data: updatedTrack });
    }
    handlehttpError(res, "ITEM_NOT_FOUND");
  } catch (e) {
    handlehttpError(res, "ERROR_UPDATE_ITEM");
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
    const data = await trackModel.destroy({ where: { id } }); // Busca todas las pistas en la base de datos
    res.send({ data }); // Envía los datos en la respuesta
  } catch (e) {
    console.log(e);
    handlehttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }; // destructuracion
