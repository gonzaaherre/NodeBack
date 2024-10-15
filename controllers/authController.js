const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJWT");
const { usersModel } = require("../models");
const { handlehttpError } = require("../utils/handleError");
/**
 * Controller para registrar un nuevo usuario
 *
 * @param {Object} req - Informaci n del request
 * @param {Object} res - Objeto response
 *
 * @returns {Promise<void>}
 */
const RegistrerController = async (req, res) => {
  try {
    req = matchedData(req); //Datos validados
    const password = await encrypt(req.password); //Encriptar contraseña
    const body = { ...req, password };
    const dataUser = await usersModel.create(body); //Crear usuario
    dataUser.set("password", undefined, { strict: false }); //Ocultar contraseña
    const data = {
      token: await tokenSign(dataUser), //Generar token: Usa tokenSign para generar un JWT
      user: dataUser,
    };
    res.send({ data }); //Devuelve el token y los datos del usuario (sin la contraseña) en la respuesta.
  } catch (error) {
    handlehttpError(error, "error al registrar");
  }
};

/**
 * Controlador para el inicio de sesion de un usuario
 *
 * @param {Object} req - Informaci n del request
 * @param {Object} res - Objeto response
 *
 * @returns {Promise<void>}
 */
const loginController = async (req, res) => {
  try {
    req = matchedData(req);
    //Buscar usuario seleccionando solo los campos password, name, role, y email.
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password name role email");
    if (!user) {
      handlehttpError(res, "usuario no existe");
      return;
    }
    const hashPassword = user.get("password");
    const check = await compare(req.password, hashPassword); //Usa compare para verificar la contraseña
    if (!check) {
      handlehttpError(res, "contraseña incorrecta");
      return;
    }
    // Si las credenciales son correctas, oculta la contraseña antes de responder con el usuario.
    user.set("password", undefined, { strict: false });
    const data = {
      //Generar token: Genera un JWT con la función tokenSign.
      token: await tokenSign(user),
      user,
    };
    res.send({ data }); //Devuelve el token y los datos del usuario (sin la contraseña).
  } catch (error) {
    handlehttpError(res, error);
    console.log(error);
  }
};
module.exports = { RegistrerController, loginController };
