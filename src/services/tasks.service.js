const db = require('../database/connection');

function criarTarefa(titulo, usuarioId) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO tarefas (titulo, usuario_id)
      VALUES (?, ?)
    `;

    db.run(sql, [titulo, usuarioId], function (err) {
      if (err) {
        return reject(err);
      }

      db.get(
        'SELECT * FROM tarefas WHERE id = ?',
        [this.lastID],
        (selectErr, tarefa) => {
          if (selectErr) {
            return reject(selectErr);
          }

          resolve(tarefa);
        }
      );
    });
  });
}

function listarTarefas(usuarioId, filtros) {
  return new Promise((resolve, reject) => {
    const page = Number(filtros.page) > 0 ? Number(filtros.page) : 1;
    const limit = Number(filtros.limit) > 0 ? Number(filtros.limit) : 10;
    const offset = (page - 1) * limit;

    let where = 'WHERE usuario_id = ?';
    const params = [usuarioId];

    if (filtros.concluida !== undefined) {
      where += ' AND concluida = ?';
      params.push(filtros.concluida === 'true' ? 1 : 0);
    }

    if (filtros.titulo) {
      where += ' AND titulo LIKE ?';
      params.push(`%${filtros.titulo}%`);
    }

    const countSql = `SELECT COUNT(*) AS total FROM tarefas ${where}`;
    const dataSql = `
      SELECT * FROM tarefas
      ${where}
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `;

    db.get(countSql, params, (countErr, countResult) => {
      if (countErr) {
        return reject(countErr);
      }

      db.all(dataSql, [...params, limit, offset], (dataErr, tarefas) => {
        if (dataErr) {
          return reject(dataErr);
        }

        resolve({
          meta: {
            total: countResult.total,
            page,
            limit,
            totalPages: Math.ceil(countResult.total / limit)
          },
          data: tarefas
        });
      });
    });
  });
}

function atualizarTarefa(id, titulo, concluida, usuarioId) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE tarefas
      SET titulo = ?, concluida = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND usuario_id = ?
    `;

    db.run(sql, [titulo, concluida, id, usuarioId], function (err) {
      if (err) {
        return reject(err);
      }

      if (this.changes === 0) {
        return reject(new Error('TAREFA_NAO_ENCONTRADA'));
      }

      db.get(
        'SELECT * FROM tarefas WHERE id = ? AND usuario_id = ?',
        [id, usuarioId],
        (selectErr, tarefa) => {
          if (selectErr) {
            return reject(selectErr);
          }

          resolve(tarefa);
        }
      );
    });
  });
}

function excluirTarefa(id, usuarioId) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM tarefas WHERE id = ? AND usuario_id = ?';

    db.run(sql, [id, usuarioId], function (err) {
      if (err) {
        return reject(err);
      }

      if (this.changes === 0) {
        return reject(new Error('TAREFA_NAO_ENCONTRADA'));
      }

      resolve();
    });
  });
}

module.exports = {
  criarTarefa,
  listarTarefas,
  atualizarTarefa,
  excluirTarefa
};