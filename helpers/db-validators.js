const Role = require ('../models/rol')
const Usuario = require('../models/Usuario')

const esRolValido = async (rol = '')=>{

    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error(`EL ${rol} NO ESTA REGISTRADO EN LA BD`)
    }


}

const validarEmail = async (correo = '') =>{


          
        const existeMail = await Usuario.findOne({correo});

        if(existeMail){
            throw new Error(`ERRROR  : El correo ${correo} Ya está registrado`)
        }
         
          
}

const existeUsuarioPorID = async (id) =>{

    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`el ID : ${id} NO EXISTE`);

    }
    

    
}


module.exports = {
    esRolValido,
    validarEmail,
    existeUsuarioPorID
}

