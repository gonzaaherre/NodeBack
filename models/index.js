const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB === "nosql" ? "./noSql" : "./mySql";
const models = {
  usersModel: require(`${pathModels}/users`), // Importa y exporta el modelo de usuarios
  trackModel: require(`${pathModels}/tracks`), // Importa y exporta el modelo de pistas (tracks)
  storageModel: require(`${pathModels}/storage`), // Importa y exporta el modelo de almacenamiento
};
module.exports = models; // Exporta todos los modelos juntos
