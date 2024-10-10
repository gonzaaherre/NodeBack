const { trackModel } = require("../models"); // Cambia a trackModel

/**
 * obtener lista de la db
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  //si hay await hay async
  const data = await trackModel.find({}); // Busca todas las pistas en la base de datos
  res.send({ data }); // Envía los datos en la respuesta
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
  const { body } = req; // Extrae el cuerpo de la solicitud
  console.log(body);
  const data = await trackModel.create(body); // Crea un nuevo registro en la base de datos con los datos recibidos
  res.send({ data }); // Envía los datos creados en la respuesta
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
