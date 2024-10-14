const mongoose = require("mongoose"); // Importamos mongoose para definir un esquema
const mongooseDelete = require("mongoose-delete");

const StorageScheme = new mongoose.Schema(
  {
    URL: {
      type: String, // El campo `URL` es de tipo String
    },
    filename: {
      type: String, // El campo `fileName` también es de tipo String
      required: true, // El campo `fileName` es de tipo String
    },
  },
  {
    timestamps: true, // Agrega automáticamente las propiedades createdAt y updatedAt
    versionKey: false, // Evita que Mongoose agregue una clave de versión (__v) a cada documento
  }
);

StorageScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storage", StorageScheme); // Exportamos el esquema como un modelo de mongoose llamado "storage"
