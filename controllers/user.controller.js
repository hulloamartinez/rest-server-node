const  { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');


// FUNCIONES


const usuariosGet = async (req, res = response) =>{

    //const {nombre, edad, peso = 1} = req.query;
    const query = ({estado:true});
    const {limite = 5, desde = 0} = req.query;

    //DE ESTA MANERA, LAS DOS PROMESAS SE EJECUTARÁN AL MISMO TIEMPO, REDUCIENDO EL TIEMPO DE RESPUESTA
   
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
       total,
       usuarios     
    });

}
const usuariosPost = async (req, res = response) =>{

    // desestructurar y recibir parametros desde el request
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar que el correo existe

    
    // encriptar el parámetro password 
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //guardar en DB
    await usuario.save();

    //enviar la respuesta por response al front        
    res.json(
        {
        usuario
        });

}

const usuariosPut = async (req, res = response) =>{

    const {id} = req.params;
    //ignorar lo que no necesito guardar
    const {_id, password, google, correo,...resto} = req.body;

    //TODO validar contra base de datos

    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);

    }
    const usuario  = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
    
}

const usuariosDelete = async (req, res = response) =>{
    
    const {id} = req.params;

    /**
     * BORRAR FISICAMENTE
     * const usuario = await Usuario.findByIdAndDelete(id);
     * 
     * BORRAR USUARIO CAMBIANDO EL ESTADO
     */
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    
    res.json(
        {
                usuario
        });

    
}

const usuariosPatch = (req, res = response) =>{

    res.json(
        {
        msg:'Hello World from ruta patch'
        });

    
}


module.exports = {

    usuariosGet, 
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch

}