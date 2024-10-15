const mongoose = require("mongoose"); // Importamos mongoose
const mongooseDelete = require("mongoose-delete");

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String, // Nombre del usuario
    },
    age: {
      type: Number, // Edad del usuario
    },
    email: {
      type: String, // Correo electrónico del usuario
      unique: true, // Asegura que el email sea único en la base de datos
    },
    password: {
      type: String, // Contraseña del usuario
      select: false, // Evita que se devuelva la contraseña
    },
    role: {
      type: ["user", "admin"], // Solo puede ser 'user' o 'admin'
      default: "user", // Por defecto, el rol es 'user'
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt
    versionKey: false, // Evita la versión del documento
  }
);

UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserScheme); // Exportamos el modelo llamado "users"
