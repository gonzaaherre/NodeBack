const dotenv = require("dotenv"); // Importamos dotenv para trabajar con variables de entorno
const mongoose = require("mongoose"); // Importamos mongoose para conectar con MongoDB

dotenv.config({ path: "./config.env" }); // Cargamos las variables de entorno desde un archivo .env

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false); // Desactiva las advertencias de consultas estrictas
    const DB_URI = process.env.DB_URI; // Obtiene la URI de conexión desde las variables de entorno
    await mongoose.connect(DB_URI); // Conecta con la base de datos usando la URI
    console.log("Mongo connected"); // Muestra en consola que la conexión fue exitosa
  } catch (error) {
    console.log("*** ERROR EN LA CONEXIÓN ***", error); // Muestra un error si la conexión falla
    process.exit(); // Sale del proceso en caso de error
  }
};

module.exports = dbConnect; // Exportamos la función de conexión
