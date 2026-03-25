const jwt = require('jsonwebtoken'); // Importa biblioteca jsonwebtoken para verificar tokens

const SECRET = process.env.JWT_SECRET; // Obtém chave secreta da variável de ambiente

function verificarToken(req, res, next) { // Middleware que valida token JWT enviado pelo cliente
  const authHeader = req.headers.authorization; // Extrai header Authorization da requisição

  if (!authHeader) { // Verifica se header Authorization foi enviado
    return res.status(401).json({ erro: 'Token não enviado' }); // Retorna erro 401 se header estiver ausente
  }

  const partes = authHeader.split(' '); // Divide header em partes (esperado: ['Bearer', '<token>'])

  if (partes.length !== 2) { // Verifica se header tem exatamente duas partes
    return res.status(401).json({ erro: 'Formato do token inválido' }); // Retorna erro se formato for inválido
  }

  const [tipo, token] = partes; // Desestrutura: tipo = 'Bearer', token = valor do token

  if (tipo !== 'Bearer') { // Verifica se o tipo é exatamente 'Bearer'
    return res.status(401).json({ erro: 'Tipo de token inválido' }); // Retorna erro se tipo não for Bearer
  }

  try { // Tenta verificar e decodificar o token
    const dados = jwt.verify(token, SECRET); // Valida token com a chave secreta e extrai payload
    req.usuario = dados; // Armazena dados do usuário no objeto request para uso em rotas
    next(); // Chama próximo handler (permite acesso à rota protegida)
  } catch (error) { // Captura erros de verificação (token inválido, expirado, etc)
    return res.status(401).json({ erro: 'Token inválido ou expirado' }); // Retorna erro 401 se token for inválido
  }
}

module.exports = verificarToken; // Exporta middleware para uso em outras rotas