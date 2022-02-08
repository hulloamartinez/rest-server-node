const  { response } = require('express');

const usuariosGet = (req, res = response) =>{

    const {nombre, edad, peso = 1} = req.query;

    res.json({

        msg:'Hello World from ruta GET',
        nombre,
        edad,
        peso

    });

}
const usuariosPost = (req, res = response) =>{

    const {nombre, apellido} = req.body;

    
    res.status(201).json(
        {
        msg:'Hello World from ruta POST',
        nombre, apellido
        });


}

const usuariosPut = (req, res = response) =>{

    const {id} = req.params;

    res.json(
        {               
        msg:'Hello World from ruta PUT',           
        id 
        });
    
}

const usuariosDelete = (req, res = response) =>{
    res.json(
        {
        msg:'Hello World from ruta DELETE'
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