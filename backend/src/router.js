const express = require('express');
const router = express.Router();

const { insertUser, findByIdUser, updateUser, recoverUser, insertBookmark, collectFavoriteMidias, removeFavoriteMidia } = require('./app/controller/UserController');
const { login, recoverPassword } = require('./app/controller/AuthController');
const { collectMidias, findByIdMidia } = require('./app/controller/MidiaController');
const { checkAuthentication, checkAuthorization } = require('./app/middlewares/authentication');
const { insertMidia, updateMidia, deleteMidia, collectUsers, updateTheUser, deleteUser } = require('./app/controller/AdminController');
const { uploadMovie } = require('./app/middlewares/uploadMovie');
const { uploadSerie } = require('./app/middlewares/uploadSerie');

// UserController
router.post('/user/insert', insertUser);
router.post('/user/findById', findByIdUser);
router.post('/user/update', checkAuthentication, updateUser);
router.post('/user/recover', recoverUser);
router.post('/user/insertBookmark', checkAuthentication, insertBookmark);
router.post('/user/collectFavoriteMidias', checkAuthentication, collectFavoriteMidias);
router.post('/user/removeFavoriteMidia', checkAuthentication, removeFavoriteMidia);

// AuthController
router.post('/login', login);
router.post('/recover', recoverPassword);

// MoviesSeriesController
router.get('/midia/collect', collectMidias);
router.post('/midia/findById', findByIdMidia);

// Admin
router.post('/admin/insertMidia', checkAuthentication, checkAuthorization, insertMidia);
router.post('/admin/updateMidia', checkAuthentication, checkAuthorization, updateMidia);
router.post('/admin/deleteMidia', checkAuthentication, checkAuthorization, deleteMidia);

router.get('/admin/collectUsers', checkAuthentication, checkAuthorization, collectUsers);
router.post('/admin/updateTheUser', checkAuthentication, checkAuthorization, updateTheUser);
router.post('/admin/deleteUser', checkAuthentication, checkAuthorization, deleteUser);

router.post('/movie/upload', uploadMovie.single('midiaImage'), (req, res) => res.json({ message: 'Upload movie' }));
router.post('/serie/upload', uploadSerie.single('midiaImage'), (req, res) => res.json({ message: 'Upload serie' }));

module.exports = router;