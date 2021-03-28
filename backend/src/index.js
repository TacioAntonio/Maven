require('dotenv').config()
const { success } = require('./util/messages');
const { APP_PORT } = require('./config/configurations');
const express = require('express');
const app = express();
const port = APP_PORT || 3000;
const message = _ => { success(`[server] server online at http://localhost:${port}.`); }
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.listen(port, message);