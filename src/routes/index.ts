import { Router } from 'express';
import * as PessoaController from '../controllers/PessoaController'
import * as UserController from '../controllers/UserController'

import { AuthJWT } from '../middlewares/auth.jwt';

const router = Router();

router.post('/pessoas', PessoaController.createPessoa)
router.get('/pessoas', PessoaController.getPessoas)
router.get('/pessoa/:id', PessoaController.getPessoa)
router.put('/pessoa/:id', PessoaController.updatePessoa)
router.delete('/pessoa/:id', PessoaController.deletePessoa)

router.post('/users', AuthJWT.private, UserController.createUser)
router.get('/users', AuthJWT.private, UserController.getUsers)
router.get('/user/:id', AuthJWT.private, UserController.getUser)
router.put('/user/:id', AuthJWT.private, UserController.updateUser)
router.delete('/user/:id', AuthJWT.private, UserController.deleteUser)

router.post('/login', UserController.loginJWT)

router.get('/ping', (req, res) => {
    res.json({pong: true});
})

export default router;
