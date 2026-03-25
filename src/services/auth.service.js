const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para gerar token JWT
const bcrypt = require('bcrypt'); // Importa bcrypt para hash e comparação de senha
const db = require('../database/connection'); // Conexão SQLite com o banco de dados

const SECRET = process.env.JWT_SECRET; // Chave secreta para assinar o token JWT

function registrarUsuario(nome, email, senha) {
  return new Promise(async (resolve, reject) => {
    try {
      const senhaHash = await bcrypt.hash(senha, 10); // Gera hash de senha com 10 rounds de salt

      const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)'; // Query para inserir usuário

      db.run(sql, [nome, email, senhaHash], function (err) { // Executa query e usa this.lastID em caso de sucesso
        if (err) {
          return reject(err); // Rejeita promise em caso de erro (e.g., email duplicado)
        }

        resolve({ // Resolve promise com dados do novo usuário (sem senha)
          id: this.lastID,
          nome,
          email
        });
      });
    } catch (error) {
      reject(error); // Rejeita promise em caso de erro de hashing ou SQL
    }
  });
}

function buscarUsuarioPorEmail(email) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ?'; // Query para buscar usuário pelo email

    db.get(sql, [email], (err, usuario) => { // Executa query e retorna primeiro resultado
      if (err) {
        return reject(err); // Rejeita promise em caso de erro de consulta
      }

      resolve(usuario); // Resolve com objeto de usuário ou undefined se não encontrado
    });
  });
}

async function loginUsuario(email, senha) {
  const usuario = await buscarUsuarioPorEmail(email); // Busca usuário no banco pelo email

  if (!usuario) {
    throw new Error('USUARIO_NAO_ENCONTRADO'); // Lança erro se não existir usuário cadastrado
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha); // Compara senha fornecida com hash armazenado

  if (!senhaValida) {
    throw new Error('SENHA_INVALIDA'); // Lança erro se senha estiver incorreta
  }

  const token = jwt.sign(
    {
      id: usuario.id, // Inclui id no payload do token
      nome: usuario.nome, // Inclui nome no payload do token
      email: usuario.email // Inclui email no payload do token
    },
    SECRET, // Chave secreta para assinatura
    { expiresIn: '1h' } // Expiração do token em 1 hora
  );

  return token; // Retorna token JWT gerado
}

module.exports = {
  registrarUsuario,
  loginUsuario
};