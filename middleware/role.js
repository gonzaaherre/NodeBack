const { handlehttpError } = require("../utils/handleError");
/**
 * array con roles permitidos
 * @param {*} rol
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log(user);
    const roleByUser = user.role; //[admin][user]
    const checkValueError = roles.some((rolSingle) =>
      roleByUser.includes(rolSingle)
    );
    if (!checkValueError) {
      handlehttpError(res, "NO_ROLES");
      return;
    }
    next();
  } catch (error) {
    handlehttpError(res, "NO_ROLES");
  }
};
module.exports = { checkRol };
