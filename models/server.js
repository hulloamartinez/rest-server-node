const { throws } = require('assert');
const express = require('express');
const cors = require('cors');
const { listenerCount } = require('process');
const  {dbConnection} = require ('../db/config')

class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conexion db

        this.conectarDB();

        //middlewares 
        this.middlewares();
        //rutasde la appp

        this.routes();
        
    }

    async conectarDB(){

        await dbConnection();


    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //parse y lectura de body
        this.app.use(express.json());
        

        //directorio público
        this.app.use(express.static('public'));


       

    }

    routes(){
            //           ruta publica                     ruta interna
            this.app.use(this.usuariosPath, require('../routes/usuario.rutas'));
              
         
       

    }
    listen() {

        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en puerto: ', this.port)
        });
        
    }

}
module.exports = Server;