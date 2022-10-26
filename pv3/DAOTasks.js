'use strict'

class DAOTasks {
  constructor(pool) {
    this.pool = pool
  }
  getAllTasks(email, callback) {
    this.pool.getConnection(function (err, connection) {
      if (err) {
        callback(new Error('Error de conexión a la base de datos'))
      } else {
        connection.query(
          `SELECT aw_tareas_usuarios.idUser id,  aw_tareas_tareas.texto "text",aw_tareas_user_tareas.hecho    done, GROUP_CONCAT(concat(aw_tareas_etiquetas.texto)) "Tags"
          from aw_tareas_usuarios
          join aw_tareas_user_tareas on aw_tareas_usuarios.idUser = aw_tareas_user_tareas.idUser
          join aw_tareas_tareas ON aw_tareas_user_tareas.idTarea = aw_tareas_tareas.idTarea
          join aw_tareas_tareas_etiquetas ON aw_tareas_tareas.idTarea = aw_tareas_tareas_etiquetas.idTarea
          join aw_tareas_etiquetas ON aw_tareas_etiquetas.idEtiqueta = aw_tareas_tareas_etiquetas.idEtiqueta
          where aw_tareas_usuarios.email = ?
          GROUP BY aw_tareas_tareas.texto ; `,
          [email],
          function (err, rows) {
            connection.release() // devolver al pool la conexión
            if (err) {
              callback(new Error('Error de acceso a la base de datos'))
            } else {
              if (rows.length === 0) {
                callback(null, '') //no está el usuario con el password proporcionado
              } else {
                rows.map((row) => {
                  let tgs = row.Tags.split(',')
                  row.Tags = [...tgs]
                })
                callback(null, rows)
              }
            }
          }
        )
      }
    })
  }

  //insertTask(email, task, callback) {...}
  /*markTaskDone(idTask, callback) {  ...  }  */
  deleteCompleted(email, callback) {
    this.pool.getConnection(function (err, connection) {
      if (err) {
        callback(new Error('Error de conexión a la base de datos'))
      } else {
        connection.query(
          `DELETE
          from aw_tareas_user_tareas
          WHERE aw_tareas_user_tareas.hecho = 1 and aw_tareas_user_tareas.idUser = (
          SELECT idUser from aw_tareas_usuarios WHERE email = ?
          )`,
          [email],
          function (err, rows) {
            connection.release() // devolver al pool la conexión
            if (err) {
              callback(new Error('Error de acceso a la base de datos'))
            } else {
              if (rows.length === 0) {
                callback(null, '') //no está el usuario con el password proporcionado
              } else {
                callback(null, rows)
              }
            }
          }
        )
      }
    })
  }
}
module.exports = DAOTasks
