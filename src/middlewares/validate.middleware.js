function validate(schema) { // Função factory que cria middleware de validação Zod
  return (req, res, next) => { // Retorna middleware com assinatura padrão do Express
    const result = schema.safeParse(req.body); // Valida req.body com schema Zod sem lançar erro

    if (!result.success) { // Se validação falhar
      return res.status(400).json({ // Retorna erro 400
        erro: 'Dados inválidos', // Mensagem geral
        detalhes: result.error.issues.map(issue => ({ // Mapeia issues para formato amigável
          campo: issue.path.join('.'), // Caminho do campo com pontos
          mensagem: issue.message // Mensagem de erro do Zod
        }))
      });
    }

    req.body = result.data; // Sobrescreve req.body com dados validados e transformados
    next(); // Chama próximo middleware se válido
  };
}

module.exports = validate; // Exporta função factory para uso em rotas