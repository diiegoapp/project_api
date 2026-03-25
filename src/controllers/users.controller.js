const usersService = require('../services/users.service');

async function me(req, res, next) {
  try {
    const usuario = await usersService.buscarUsuarioPorId(req.usuario.id);

    return res.json({
      usuario
    });
  } catch (error) {
    if (error.message === 'USUARIO_NAO_ENCONTRADO') {
      error.statusCode = 404;
      error.message = 'Usuário não encontrado';
    }

    next(error);
  }
}

async function updateMe(req, res, next) {
  try {
    const usuarioAtualizado = await usersService.atualizarUsuario(
      req.usuario.id,
      req.body
    );

    return res.json({
      mensagem: 'Usuário atualizado com sucesso',
      usuario: usuarioAtualizado
    });
  } catch (error) {
    if (error.message === 'USUARIO_NAO_ENCONTRADO') {
      error.statusCode = 404;
      error.message = 'Usuário não encontrado';
    }

    if (error.message && error.message.includes('UNIQUE')) {
      error.statusCode = 409;
      error.message = 'Este email já está em uso';
    }

    next(error);
  }
}

async function deleteMe(req, res, next) {
  try {
    await usersService.excluirUsuario(req.usuario.id);

    return res.json({
      mensagem: 'Conta excluída com sucesso'
    });
  } catch (error) {
    if (error.message === 'USUARIO_NAO_ENCONTRADO') {
      error.statusCode = 404;
      error.message = 'Usuário não encontrado';
    }

    next(error);
  }
}

module.exports = {
  me,
  updateMe,
  deleteMe
};