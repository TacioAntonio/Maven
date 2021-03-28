const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/assets/movies');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadMovie = multer({ storage });

module.exports = { uploadMovie };