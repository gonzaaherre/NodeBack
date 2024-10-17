const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const storage = require("./storage");

const Tracks = sequelize.define(
  "tracks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    artist_name: {
      type: DataTypes.STRING,
    },
    artist_nickname: {
      type: DataTypes.STRING,
    },
    artist_nationality: {
      type: DataTypes.STRING,
    },
    duration_start: {
      type: DataTypes.INTEGER,
    },
    duration_end: {
      type: DataTypes.INTEGER,
    },
    mediaId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
// Definir relación belongsTo fuera de los métodos
Tracks.belongsTo(storage, {
  foreignKey: "mediaId",
});

// Método para obtener todas las pistas con su relación de storage
Tracks.findAllData = function () {
  return Tracks.findAll({ include: storage });
};

// Método para obtener una pista por ID con su relación de storage
Tracks.findOneData = function (id) {
  return Tracks.findOne({ where: { id }, include: storage });
};
module.exports = Tracks;
