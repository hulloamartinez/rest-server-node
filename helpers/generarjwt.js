const jwt = require('jsonwebtoken')
//LO UNICO QUE SE DEBE GUARDAR EN EL JWT ES EL UID, NADA MAS

const res = require("express/lib/response");

const generarJWT= (uid = ' ') => {

    return new Promise ((resolve, reject) =>{

        const payload = {uid};

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn : '4h'
        }, (err, token) =>{

            if(err){
                console.log(err)
                reject('NO SE PUDO GENERAR EL TOKEN')
            }else{
                resolve(token)
            }

        }) 

    })

}

module.exports = generarJWT;