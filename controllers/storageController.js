const { matchedData } = require("express-validator");
const { storageModel } = require("../models"); // Cambia a trackModel
const { handlehttpError } = require("../utils/handleError");
const fs = require("fs");
const MEDIA_PATH = `${__dirname}/../storage`;
const URL_PUBLIC = process.env.URL_PUBLIC;
/**
 * obtener lista de la db
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    //si hay await hay async
    const data = await storageModel.findAll(); // Busca todas las pistas en la base de datos
    res.send({ data }); // Envía los datos en la respuesta
  } catch (e) {
    handlehttpError(res, "ERROR_GET_STORAGES");
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
    //si hay await hay async
    const { id } = matchedData(req);
    const data = await storageModel.findByPk(id); // Busca todas las pistas en la base de datos
    res.send({ data }); // Envía los datos en la respuesta
  } catch (e) {
    handlehttpError(res, "ERROR_GET_STORAGE");
    console.log(e);
  }
};

/**
 * insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { file } = req; // Accede correctamente al archivo cargado

    if (!file) {
      return handlehttpError(res, "FILE_NOT_UPLOADED", 400); // Manejo de error si no hay archivo
    }

    const body = {
      url: `${URL_PUBLIC}/${file.filename}`, // Crea la URL pública del archivo
      filename: file.filename, // Asigna el nombre del archivo
    };

    const response = await storageModel.create(body); // Crea un nuevo registro en la base de datos
    res.send({ response }); // Devuelve la respuesta
  } catch (e) {
    handlehttpError(res, "ERROR_CREATE_ITEM", 500); // Manejo de errores
    console.log(e); // Imprime el error en consola para depuración
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

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const id = req.id;

    // Encuentra el archivo en la base de datos
    const findMedia = await storageModel.findByPk(id);
    if (!findMedia) {
      return handlehttpError(res, "FILE_NOT_FOUND_IN_DB", 404);
    }

    const fileName = findMedia.filename;
    const filePath = `${MEDIA_PATH}/${fileName}`;

    // Verifica si el archivo existe en el sistema local
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Elimina el archivo del almacenamiento local
    } else {
      console.log(fileName);
      console.log(filePath);
      return handlehttpError(res, "FILE_DOES_NOT_EXIST", 404);
    }

    // Elimina el documento de la base de datos solo después de eliminar el archivo
    await storageModel.destroy({
      where: { id }, // Filtrar por ID
    });

    const data = {
      fileName,
      deleted: true,
    };

    res.send({ data });
  } catch (e) {
    handlehttpError(res, "ERROR_DELETE_ITEM");
    console.log(e);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }; // destructuracion
