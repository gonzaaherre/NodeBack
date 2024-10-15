const { handlehttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { usersModel } = require("../models");
const authMiddleware = async (req, res, next) => {
  try {
    // Verificamos que el encabezado 'authorization' esté presente
    if (!req.headers.authorization) {
      handlehttpError(res, "NEED_TOKEN"); // Enviamos el error si falta el token
      return; // Salimos del middleware
    }

    // Intentamos obtener el token, asegurándonos de que esté en formato 'Bearer <token>'
    const token = req.headers.authorization.split(" ")[1];

    // Si no hay token después de "Bearer", lanzamos un error
    if (!token) {
      handlehttpError(res, "INVALID_TOKEN_FORMAT");
      return;
    }

    // Verificamos el token usando nuestra función 'verifyToken'
    const dataToken = await verifyToken(token);

    // Si la verificación del token falla o no tiene un _id, lanzamos un error
    if (!dataToken || !dataToken._id) {
      handlehttpError(res, "ERROR_ID_TOKEN");
      return;
    }
    const user = await usersModel.findOne({ _id: dataToken._id });
    req.user = user;
    // Si todo está bien, continuamos al siguiente middleware o controlador
    next();
  } catch (error) {
    // Cualquier error en el proceso lanza un error de "No sesión"
    handlehttpError(res, "NO_SESSION");
  }
};

module.exports = { authMiddleware };
