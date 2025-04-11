const fp = require('fastify-plugin')
const sqlite3 = require('sqlite3').verbose()

async function dbConnector(fastify, options) {
  const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })

  // Cria tabela de posts se não existir
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // Decora o Fastify com o cliente db
  fastify.decorate('db', db)
}

module.exports = fp(dbConnector)
