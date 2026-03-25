const { z } = require('zod'); // Importa função z do Zod para criar schemas

const createTaskSchema = z.object({ // Schema Zod para criação de tarefa
  titulo: z // Campo titulo obrigatório
    .string() // Deve ser string
    .min(3, 'O título deve ter pelo menos 3 caracteres') // Mínimo 3 caracteres
});

const updateTaskSchema = z.object({ // Schema Zod para atualização de tarefa
  titulo: z // Campo titulo obrigatório
    .string() // Deve ser string
    .min(3, 'O título deve ter pelo menos 3 caracteres'), // Mínimo 3 caracteres
  concluida: z.boolean() // Campo concluida obrigatório como boolean
});

module.exports = { // Exporta schemas para uso em middlewares
  createTaskSchema,
  updateTaskSchema
};