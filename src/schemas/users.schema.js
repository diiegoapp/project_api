const { z } = require('zod');

const updateMeSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').optional()
}).refine(
  data => data.nome || data.email || data.senha,
  { message: 'Informe ao menos um campo para atualização' }
);

module.exports = {
  updateMeSchema
};