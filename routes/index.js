const express = require("express"); // Importamos express
const router = express.Router(); // Creamos un enrutador
const fs = require("fs"); // Importamos el módulo fs para trabajar con el sistema de archivos

const PATH_ROUTES = __dirname; // Obtiene la ruta del directorio actual (donde se ejecuta este archivo)

const RemoveExtension = (fileName) => {
  // Remueve la extensión de un archivo (por ejemplo, convierte 'tracks.js' en 'tracks')
  return fileName.split(".").shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
  // Lee todos los archivos en el directorio y filtra por nombre
  const name = RemoveExtension(file); // Remueve la extensión de cada archivo
  if (name !== "index") {
    // Evita cargar el archivo 'index.js' como una ruta
    console.log(`cargando ruta ${file}`); // Muestra en consola la ruta que se está cargando
    router.use(`/${name}`, require(`./${file}`)); // Crea una ruta basada en el nombre del archivo y requiere el archivo correspondiente
  }
});

module.exports = router; // Exporta el enrutador
