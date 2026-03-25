const { z } = require('zod'); // Importa função z do Zod para criar schemas

const registerSchema = z.object({ // Schema Zod para validação de registro
  nome: z // Campo nome
    .string() // Deve ser string
    .min(3, 'O nome deve ter pelo menos 3 caracteres'), // Mínimo 3 caracteres
  email: z // Campo email
    .string() // Deve ser string
    .email('Email inválido'), // Deve ser email válido
  senha: z // Campo senha
    .string() // Deve ser string
    .min(6, 'A senha deve ter pelo menos 6 caracteres') // Mínimo 6 caracteres
});

const loginSchema = z.object({ // Schema Zod para validação de login
  email: z // Campo email
    .string() // Deve ser string
    .email('Email inválido'), // Deve ser email válido
  senha: z // Campo senha
    .string() // Deve ser string
    .min(6, 'A senha deve ter pelo menos 6 caracteres') // Mínimo 6 caracteres
});

module.exports = { // Exporta schemas para uso em middlewares
  registerSchema,
  loginSchema
};