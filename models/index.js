const models = {
  usersModel: require("./noSql/users"), // Importa y exporta el modelo de usuarios
  trackModel: require("./noSql/tracks"), // Importa y exporta el modelo de pistas (tracks)
  storageModel: require("./noSql/storage"), // Importa y exporta el modelo de almacenamiento
};
module.exports = models; // Exporta todos los modelos juntos
