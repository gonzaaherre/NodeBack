const { Sequelize } = require("sequelize");
const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
  //instanciamiento de sequialize
  host: host,
  dialect: "mysql",
});
const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate(); //conexion a la db
    console.log("MYSQL CONNECTED");
    return sequelize;
  } catch (e) {
    console.log("MYSQL ERROR", e);
  }
};

module.exports = { dbConnectMySql, sequelize };
