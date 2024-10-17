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
Tracks.findAllData = function () {
  //una cancion pertenece a un storage
  Tracks.belongsTo(storage, {
    foreignKey: "mediaId",
  });
  return Tracks.findAll({ include: storage }); //incluye la relacion que tiene con storage
};

Tracks.findOneData = function (id) {
  //una cancion pertenece a un storage
  Tracks.belongsTo(storage, {
    foreignKey: "mediaId",
  });
  return Tracks.findOneData({ where: { id }, include: storage }); //incluye la relacion que tiene con storage
};
module.exports = Tracks;
