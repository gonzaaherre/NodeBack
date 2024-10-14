const express = require("express");
const router = express.Router();
const { usersModel } = require("../models");
const { encrypt, compare } = require("../utils/handlePassword");
const {
  validatorRegistrer,
  validatorLogin,
} = require("../validator/authValidator");
const { matchedData } = require("express-validator");
/**
 * crear registro
 *http://localhost:3001/api/auth/login
 */
router.post("/register", validatorRegistrer, async (req, res) => {
  req = matchedData(req);
  const password = await encrypt(req.password);
  const body = { ...req, password };
  const data = await usersModel.create(body);
  data.set("password", undefined, { strict: false });
  res.send({ data });
});
module.exports = router;
