const Server = require('./models/server');
const { dbConnection } = require('./db/config');
require('dotenv').config();
const server = new Server();
server.listen();