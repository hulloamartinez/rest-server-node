const Usuario = require('../models/Usuario')
const { response } = require("express");
const bcryptjs = require('bcryptjs');
const generarJWT = require('../helpers/generarjwt')


const loginController = async (req, res = response) =>{

    const {correo, password} = req.body;

    try {

        //VERIFICAR SI EL EMAIL EXISTE
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'USUARIO / PASSWPRD NO ES CORRECTO / USUARIO'
            })

        }

        //VERIFICAR SI EL USUARIO ESTA ACTIVO

        if (!usuario.estado){
            return res.status(400).json({
                msg: "USUARIO NO PUEDE INICIAR SESION"
            })
        }

        //VERIFICAR LA CONTRASEÑA

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword){
            return res.status(400).json({
                msg: "USUARIO / PASSWPRD NO ES CRRECTO / PASSWORD"
            })
        }

        //GENERAR EL JWT

        const token  = await generarJWT( usuario.id);

        res.json({
            usuario,
            token
        })

        
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            msg: 'HABLE CON ELD AMION',
                  
    })
    }

   
}


module.exports = {
    loginController
}