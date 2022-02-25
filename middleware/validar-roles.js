const { request, response } = require("express");


const validarRoles = (req = request, res = response, next) =>{
    
    if(!req.usuario){

        return res.status(500).json({
            msg:'SE QUIERE VALIDAR EL ROLE SIN VALIDAR ANTES EL  TOKEN PRIMERO'
        });
    }

    const { rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador. - Funcion denegada`
        });
    }
    


    next();
}

const tieneRol = (...roles) =>{

    return (req, res = response, next)=>{

        if(!req.usuario){

            return res.status(500).json({
                msg:'SE QUIERE VALIDAR EL ROLE SIN VALIDAR ANTES EL  TOKEN PRIMERO'
            });
        }

        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`${req.usuario.nombre} NO TIENE ROL ASIGNADO. - Funcion denegada`
            });
        }
        


        next();
    }


}


module.exports = {
    validarRoles,
    tieneRol
} 