const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();
/**
 * hay que pasar lo que queremos ver del usuario
 * @param user
 * ESTO NOS RETORNA EL JWT
 */

const tokenSign = async (user) => {
  //firmar el token
  const sign = jwt.sign(
    {
      //para que se haga dinamico sin depender de que motor de db se usa
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return sign;
};
/**
 * pasar el token de session de JWT
 * @param tokenJwt
 * @returns
 */
const verifyToken = async (tokenJwt) => {
  //verificar la firma
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
