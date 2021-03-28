const mongoose = require('mongoose');
const { APP_DB } = require('../config/configurations');
const { success, error } = require('../util/messages');

mongoose.connect(APP_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', error.bind(console, 'connection error:'));
db.once('open', function () {
    success(`[database] connected at ${APP_DB}.`)
});

module.exports = mongoose;