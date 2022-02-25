const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');



const validarJWT = async (req = request, res = response, next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'NO HAY TOKEN EN LA REQUEST'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer el usuario correspondiente al UID
        const usuario = await Usuario.findById(uid);
        
        
         //LEER SI EXISTE UN USUARIO
         if(!usuario){

            return res.status(401).json({
                msg: "TOKEN NO VALIDO - USUARIO NO EXISTE EN BD"
            })

        }
        //validar el estado del usuario. DEBE SER TRUE

        if(!usuario.estado){

            return res.status(401).json({
                msg: "TOKEN NO VALIDO - USUARIO  ESTADO FALSE"
            })

        }

       


        req.usuario = usuario;


        next();
    
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'TOKEN NO VALIDO'
        })
    }
    

    


}

module.exports = validarJWT;