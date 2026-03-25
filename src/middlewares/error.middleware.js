function errorHandler(err, req, res, next) { // Middleware de tratamento de erros com assinatura padrão do Express
  console.error(err); // Loga erro no console para debugging

  if (err.statusCode) { // Verifica se erro tem statusCode personalizado
    return res.status(err.statusCode).json({ // Retorna resposta com status específico
      erro: err.message // Mensagem do erro personalizado
    });
  }

  return res.status(500).json({ // Retorna erro 500 genérico
    erro: 'Erro interno do servidor' // Mensagem padrão para erros não tratados
  });
}

module.exports = errorHandler; // Exporta middleware para uso no app