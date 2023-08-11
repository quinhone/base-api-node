import { Router } from 'express';
import * as PessoaController from '../controllers/PessoaController'

const router = Router();

router.post('/pessoas', PessoaController.createPessoa)
router.get('/pessoas', PessoaController.getPessoas)
router.get('/pessoa/:id', PessoaController.getPessoa)
router.put('/pessoa/:id', PessoaController.updatePessoa)
router.delete('/pessoa/:id', PessoaController.deletePessoa)

router.get('/ping', (req, res) => {
    res.json({pong: true});
})

export default router;
