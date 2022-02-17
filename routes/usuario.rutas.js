const {check} = require('express-validator')
const {Router} = require ('express');
const { 
        usuariosGet,
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch, 
        usuariosPut 
     } = require('../controllers/user.controller');
const validarCampos = require('../middleware/validar-campos');
const Role = require('../models/rol');
const { esRolValido, validarEmail, existeUsuarioPorID } = require('../helpers/db-validators');


const router  = Router();
router.get('/', usuariosGet);

router.post('/',[
        check('nombre', 'Debe ingresar el nombre').not().isEmpty(),
        check('password', 'El PASSWORD DEBE TENER 6 CARACTERES').isLength({min: 6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(validarEmail),
        
        check('rol').custom(esRolValido),
        validarCampos
        
], usuariosPost);

router.put('/:id',[
        check('id', 'no es un ID Valido').isMongoId(),
        check('id').custom(existeUsuarioPorID),
        check('rol').custom(esRolValido),
        validarCampos
], usuariosPut);

router.delete('/:id',[
        check('id', 'no es un ID Valido').isMongoId(),
        check('id').custom(existeUsuarioPorID),
        validarCampos

], usuariosDelete);

router.patch('/', usuariosPatch);
 








module.exports = router;