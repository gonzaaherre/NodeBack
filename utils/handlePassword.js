const bcrypt = require("bcrypt");
/**
 * Encrypt a password
 * @param {string} passwordPlain password to encrypt
 * @return {string} encrypted password
 */
const encrypt = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, 10);
  return hash;
};
/**
 * Compare a password with a hash
 * @param {string} passwordPlain password to compare
 * @param {string} hashPassword hash password to compare
 * @return {boolean} true if the password match with the hash
 */
const compare = async (passwordPlain, hashPassword) => {
  const match = await bcrypt.compare(passwordPlain, hashPassword);
  return match;
};

module.exports = { encrypt, compare };
