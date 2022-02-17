const {Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    
    nombre : {

        type: String,
        required:[true, 'El nombre es obligatorio']

    },   
    correo : {

        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique:true

    },
    password : {

        type: String,
        required:[true, 'El Password es obligatorio']

    },
    img : {

        type: String
       
    },
    rol : {

        type: String,
        required:[true, 'El rol es obligatorio'],
        emun : ['ADMIN_ROLE', 'USER_ROLE']

    },
    estado : {

        type: Boolean,
        default: true

    },
    google : {

        type: Boolean,
        default: false
    }     
    
});

//SOBREESCRIBIR FUNCION TOJSON PARA OCULTAR LA CONTRASEÑA
//TIENE QUE SER UNA FUNCION NORMAL Y NO FLECHA

UsuarioSchema.methods.toJSON = function(){

    const {__v, password, ...usuario } = this.toObject();

    return usuario;


}



module.exports = model('Usuario',UsuarioSchema);