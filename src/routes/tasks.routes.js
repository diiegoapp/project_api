const express = require('express');
const tasksController = require('../controllers/tasks.controller');
const verificarToken = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createTaskSchema, updateTaskSchema } = require('../schemas/tasks.schema');

const router = express.Router();

router.use(verificarToken);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Estudar Swagger
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Tarefa criada com sucesso
 *                 tarefa:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     titulo:
 *                       type: string
 *                       example: Estudar Swagger
 *                     concluida:
 *                       type: integer
 *                       example: 0
 *                     usuario_id:
 *                       type: integer
 *                       example: 1
 *                     created_at:
 *                       type: string
 *                       example: 2026-03-24 10:00:00
 *                     updated_at:
 *                       type: string
 *                       example: 2026-03-24 10:00:00
 */
router.post('/', validate(createTaskSchema), tasksController.create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista as tarefas do usuário autenticado com paginação e filtros
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: concluida
 *         schema:
 *           type: boolean
 *         example: false
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         example: API
 *     responses:
 *       200:
 *         description: Lista paginada de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 12
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       titulo:
 *                         type: string
 *                         example: Estudar API
 *                       concluida:
 *                         type: integer
 *                         example: 0
 *                       usuario_id:
 *                         type: integer
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         example: 2026-03-24 10:00:00
 *                       updated_at:
 *                         type: string
 *                         example: 2026-03-24 10:00:00
 */
router.get('/', tasksController.list);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - concluida
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Estudar Jest
 *               concluida:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/:id', validate(updateTaskSchema), tasksController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/:id', tasksController.remove);

module.exports = router;