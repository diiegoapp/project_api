const express = require('express');
const usersController = require('../controllers/users.controller');
const verificarToken = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { updateMeSchema } = require('../schemas/users.schema');

const router = express.Router();

router.use(verificarToken);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 */
router.get('/me', usersController.me);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Diego Paiva
 *               email:
 *                 type: string
 *                 example: novo@email.com
 *               senha:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       409:
 *         description: Email já está em uso
 */
router.put('/me', validate(updateMeSchema), usersController.updateMe);

/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Exclui a conta do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conta excluída com sucesso
 */
router.delete('/me', usersController.deleteMe);

module.exports = router;