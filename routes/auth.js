const express = require("express");
const router = express.Router();
const {
  RegistrerController,
  loginController,
} = require("../controllers/authController");
const {
  validatorRegistrer,
  validatorLogin,
} = require("../validator/authValidator");
const { matchedData } = require("express-validator");
/**
 * crear registro
 *http://localhost:3001/api/auth/login
 */
router.post("/register", validatorRegistrer, RegistrerController);
router.post("/login", validatorLogin, loginController);
module.exports = router;
