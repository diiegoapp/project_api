const authService = require('../services/auth.service');

async function register(req, res, next) {
  try {
    const { nome, email, senha } = req.body;
    const usuario = await authService.registrarUsuario(nome, email, senha);

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso',
      usuario
    });
  } catch (error) {
    if (error.message && error.message.includes('UNIQUE')) {
      error.statusCode = 409;
      error.message = 'Este email já está cadastrado';
    }

    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, senha } = req.body;
    const token = await authService.loginUsuario(email, senha);

    return res.json({
      mensagem: 'Login realizado com sucesso',
      token
    });
  } catch (error) {
    if (error.message === 'USUARIO_NAO_ENCONTRADO') {
      error.statusCode = 401;
      error.message = 'Usuário não encontrado';
    }

    if (error.message === 'SENHA_INVALIDA') {
      error.statusCode = 401;
      error.message = 'Senha inválida';
    }

    next(error);
  }
}

function perfil(req, res) {
  return res.json({
    mensagem: 'Acesso autorizado',
    usuario: req.usuario
  });
}

module.exports = {
  register,
  login,
  perfil
};