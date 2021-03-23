const express = require('express');
const cors = require('cors')

const {databaseConnect} = require('../database/config')
class Server {
    constructor() {
        this.app = express();
        this.databaseConnection().then(() => {});
        this.middlewares();
        this.routes();
        this.start();
        this.port = process.env.PORT;
    }

    async databaseConnection() {
        await databaseConnect();
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }
    routes() {
        this.app.use('/api/usuarios', require('../routes/usuarios.js'))
        this.app.use('/api/auth', require('../routes/auth.js'))
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('server is running', this.port)
        })
    }
}

module.exports = Server;