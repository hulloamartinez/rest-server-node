const {check} = require('express-validator')
const {Router} = require ('express');
const {loginController} = require ('../controllers/auth.contoller');
const validarCampos = require('../middleware/validar-campos');


const router  = Router();
router.post('/login',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatroria').not().isEmpty(),
    validarCampos


], loginController );

module.exports = router;