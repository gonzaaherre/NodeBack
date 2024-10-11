const multer = require("multer");
//aca hace uso del almacenamiento del disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage`;
    cb(null, pathStorage);
    console.log(pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop(); //[name][png] pop()agarra el ultimo valor
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
