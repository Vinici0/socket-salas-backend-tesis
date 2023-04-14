const { Router } = require('express'); 
const { crearSala, grabarMensajeSala, getSalas, unirseSala, obtenerSalasMensajesUsuario, obtenerSalasUsuario } = require('../controllers/salas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', crearSala);

//getSalas
router.get('/', getSalas);

//grabarMensajeSala
router.post('/grabar-mensaje', validarJWT, grabarMensajeSala);

//unir a sala
router.post('/unir-sala', validarJWT, unirseSala);

//obtenerSalasMensajesUsuario
router.get('/obtener-salas-mensajes-usuario', validarJWT, obtenerSalasMensajesUsuario);

//obtenerSalasUsuario
router.get('/obtener-salas-usuario', validarJWT, obtenerSalasUsuario);



module.exports = router;