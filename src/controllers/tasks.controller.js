const tasksService = require('../services/tasks.service');

async function create(req, res, next) {
  try {
    const { titulo } = req.body;
    const usuarioId = req.usuario.id;

    const tarefa = await tasksService.criarTarefa(titulo, usuarioId);

    return res.status(201).json({
      mensagem: 'Tarefa criada com sucesso',
      tarefa
    });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const usuarioId = req.usuario.id;
    const filtros = {
      page: req.query.page,
      limit: req.query.limit,
      concluida: req.query.concluida,
      titulo: req.query.titulo
    };

    const resultado = await tasksService.listarTarefas(usuarioId, filtros);

    return res.json(resultado);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { titulo, concluida } = req.body;
    const usuarioId = req.usuario.id;

    const tarefa = await tasksService.atualizarTarefa(
      id,
      titulo,
      concluida ? 1 : 0,
      usuarioId
    );

    return res.json({
      mensagem: 'Tarefa atualizada com sucesso',
      tarefa
    });
  } catch (error) {
    if (error.message === 'TAREFA_NAO_ENCONTRADA') {
      error.statusCode = 404;
      error.message = 'Tarefa não encontrada';
    }

    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    await tasksService.excluirTarefa(id, usuarioId);

    return res.json({
      mensagem: 'Tarefa excluída com sucesso'
    });
  } catch (error) {
    if (error.message === 'TAREFA_NAO_ENCONTRADA') {
      error.statusCode = 404;
      error.message = 'Tarefa não encontrada';
    }

    next(error);
  }
}

module.exports = {
  create,
  list,
  update,
  remove
};