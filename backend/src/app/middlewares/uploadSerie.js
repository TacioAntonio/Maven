const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/assets/series');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadSerie = multer({ storage });

module.exports = { uploadSerie };