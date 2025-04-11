const fp = require('fastify-plugin')
const PostsService = require('../services/posts.service')

async function postsPlugin(fastify, opts) {
  const postsService = new PostsService(fastify.db)
  
  // Decora o Fastify com o serviço
  fastify.decorate('postsService', postsService)
}

module.exports = fp(postsPlugin, {
  name: 'posts-plugin',
  dependencies: ['db']
})
