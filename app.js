require("dotenv").config(); // Carga las variables de entorno desde un archivo .env
const express = require("express"); // Importamos el framework Express
const cors = require("cors"); // Importamos la librería CORS para gestionar la política de origen cruzado
const app = express(); // Creamos una aplicación Express
const dbConnectNoSql = require("./config/mongo"); // Importamos la función para conectar con MongoDB
const { dbConnectMySql } = require("./config/mysql"); // Importamos la función para conectar con MySQL
const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors()); // Permite solicitudes desde otros dominios (Cross-Origin Resource Sharing)
app.use(express.json()); // Middleware que parsea el cuerpo de las peticiones en formato JSON

const port = process.env.PORT || 3000; // Define el puerto, tomando primero el de la variable de entorno o usando 3000 por defecto

// Llamado de rutas
app.use("/api", require("./routes")); // Carga todas las rutas definidas en el directorio `routes`, llamando al archivo `index.js`

app.listen(port, () => {
  // Inicia el servidor en el puerto especificado
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
ENGINE_DB === "nosql" ? dbConnectNoSql() : dbConnectMySql();
