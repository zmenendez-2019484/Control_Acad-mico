const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.dbConnection();
        this.middlewares();
    }
    async dbConnection() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;