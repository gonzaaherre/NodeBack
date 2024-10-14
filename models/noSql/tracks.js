const mongoose = require("mongoose"); // Importamos mongoose
const { validate } = require("./users"); // (No se usa en este código pero está importado)
const mongooseDelete = require("mongoose-delete");
const tracksSchema = new mongoose.Schema(
  {
    name: {
      type: String, // El campo `name` es de tipo String
    },
    album: {
      type: String, // El campo `album` es de tipo String
    },
    cover: {
      type: String, // El campo `cover` es de tipo String
      validate: {
        // Validación personalizada
        validator: (req) => {
          return true; // Siempre retorna `true`, lo que significa que acepta cualquier URL
        },
        message: "ERROR URL", // Mensaje de error si la validación falla
      },
    },
    artist: {
      name: {
        type: String, // El nombre del artista es de tipo String
      },
      nickname: {
        type: String, // El apodo del artista es de tipo String
      },
      nationality: {
        type: String, // La nacionalidad del artista es de tipo String
      },
    },
    duration: {
      start: {
        type: Number, // Inicio de la duración, es de tipo Number
      },
      end: {
        type: Number, // Fin de la duración, también es de tipo Number
      },
    },
    MediaId: {
      type: mongoose.Types.ObjectId, // Referencia a otro documento (como si fuera una clave foránea en SQL)
    },
  },
  {
    timestamps: true, // Agrega las propiedades createdAt y updatedAt
    versionKey: false, // Evita la creación de una versión del documento
  }
);

tracksSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", tracksSchema); // Exportamos el esquema como un modelo llamado "tracks"
