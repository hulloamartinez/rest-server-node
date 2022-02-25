


const validarNumeros = (req, res, next) =>{

    // llamar a las validaciones de express-vlidator
    const {limite, desde} = req.query;
    if(isNan(limite) || isNan(desde) ){
        return res.status(400).json({
            msg:'ERROR, LIMITE O DESDE NO SON NUMERICOS'
        });
    }


    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    //continue con el flujo, hacia post controlleador
    next();

}

module.exports = validarNumeros;
