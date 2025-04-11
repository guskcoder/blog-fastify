class PostsService {
  constructor(db) {
    this.db = db
  }

  async getAllPosts() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM posts ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  async getPostById(id) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
        if (err) reject(err)
        resolve(row)
      })
    })
  }

  async createPost(data) {
    const { title, content } = data
    const db = this.db

    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO posts (title, content) VALUES (?, ?)',
        [title, content],
        function(err) {
          if (err) {
            return reject(err)
          }
          // this.lastID está disponível dentro desta callback
          const newId = this.lastID
          db.get('SELECT * FROM posts WHERE id = ?', [newId], (err, row) => {
            if (err) {
              return reject(err)
            }
            resolve(row)
          })
        }
      )
    })
  }

  async updatePost(id, data) {
    const { title, content } = data
    const db = this.db

    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id],
        function(err) {
          if (err) {
            return reject(err)
          }
          const changes = this.changes
          if (changes === 0) {
            return resolve({ changes: 0 })
          }
          
          db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
            if (err) {
              return reject(err)
            }
            resolve({ ...row, changes })
          })
        }
      )
    })
  }

  async deletePost(id) {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
        if (err) reject(err)
        resolve({ changes: this.changes })
      })
    })
  }
}

module.exports = PostsService
