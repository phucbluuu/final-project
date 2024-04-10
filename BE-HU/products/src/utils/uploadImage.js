const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../statics/images");

fs.mkdirSync(uploadDir, { recursive: true });

const imageFilter = (req, file, cb) => {
  cb(null, true);
};

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // This is where the files would be saved
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // This is how the files would be named
  },
});

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
});

// const uploadSupportImage = async (req, res) => {
//   const filename = req.file.filename;
//   const documentLink = await getFileUrl(filename);

//   return documentLink;
// };
module.exports = { uploadImage };
