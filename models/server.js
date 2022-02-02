const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controllers');

class Server{

    constructor(){
        this.app = express()
        this.server= require('http').createServer(this.app)
        this.io = require('socket.io')(this.server);
        

        //mis middlewares
        this.middleware()

        //mis rutas
        this.routes()

        //configuracion de sockets
        this.sockets();
    }


    middleware(){
        //CORS para evitar el error cross domain 
        this.app.use(cors());

        //servir el sitio estatico
        this.app.use(express.static('public'));

        
    }

    routes(){
        //this.app.use('/api/auth', require('../routes/auth'))
    }

    sockets(){
        this.io.on('connection', socketController)
    }

    listen(){
        this.server.listen(process.env.PORT, () => {
            console.log("Servidor corriendo en puerto ", process.env.PORT)
        })
    }
}

module.exports = Server;