const bcrypt = require('bcrypt');
const db = require('../database/connection');

function buscarUsuarioPorId(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, nome, email FROM usuarios WHERE id = ?';

    db.get(sql, [id], (err, usuario) => {
      if (err) {
        return reject(err);
      }

      if (!usuario) {
        return reject(new Error('USUARIO_NAO_ENCONTRADO'));
      }

      resolve(usuario);
    });
  });
}

function atualizarUsuario(id, dados) {
  return new Promise(async (resolve, reject) => {
    try {
      const usuarioAtual = await new Promise((res, rej) => {
        db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, usuario) => {
          if (err) return rej(err);
          if (!usuario) return rej(new Error('USUARIO_NAO_ENCONTRADO'));
          res(usuario);
        });
      });

      const nome = dados.nome ?? usuarioAtual.nome;
      const email = dados.email ?? usuarioAtual.email;
      const senha = dados.senha
        ? await bcrypt.hash(dados.senha, 10)
        : usuarioAtual.senha;

      const sql = `
        UPDATE usuarios
        SET nome = ?, email = ?, senha = ?
        WHERE id = ?
      `;

      db.run(sql, [nome, email, senha, id], function (err) {
        if (err) {
          return reject(err);
        }

        db.get(
          'SELECT id, nome, email FROM usuarios WHERE id = ?',
          [id],
          (selectErr, usuarioAtualizado) => {
            if (selectErr) {
              return reject(selectErr);
            }

            resolve(usuarioAtualizado);
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
}

function excluirUsuario(id) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM tarefas WHERE usuario_id = ?', [id], function (taskErr) {
        if (taskErr) {
          return reject(taskErr);
        }

        db.run('DELETE FROM usuarios WHERE id = ?', [id], function (userErr) {
          if (userErr) {
            return reject(userErr);
          }

          if (this.changes === 0) {
            return reject(new Error('USUARIO_NAO_ENCONTRADO'));
          }

          resolve();
        });
      });
    });
  });
}

module.exports = {
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario
};