const PostsService = require('../services/posts.service')
const {
  getPostsSchema,
  getPostSchema,
  createPostSchema,
  updatePostSchema
} = require('../schemas/posts.schema')

async function routes(fastify, opts) {
  // Listar todos os posts
  fastify.get('/posts', { schema: getPostsSchema }, async () => {
    return fastify.postsService.getAllPosts()
  })

  // Obter um post específico
  fastify.get('/posts/:id', { schema: getPostSchema }, async (request, reply) => {
    const post = await fastify.postsService.getPostById(request.params.id)
    if (!post) {
      throw fastify.httpErrors.notFound('Post não encontrado')
    }
    return post
  })

  // Criar um novo post
  fastify.post('/posts', { schema: createPostSchema }, async (request, reply) => {
    const post = await fastify.postsService.createPost(request.body)
    reply.code(201)
    return post
  })

  // Atualizar um post
  fastify.put('/posts/:id', { schema: updatePostSchema }, async (request, reply) => {
    const result = await fastify.postsService.updatePost(request.params.id, request.body)
    if (result.changes === 0) {
      throw fastify.httpErrors.notFound('Post não encontrado')
    }
    return result
  })

  // Deletar um post
  fastify.delete('/posts/:id', async (request, reply) => {
    const result = await fastify.postsService.deletePost(request.params.id)
    if (result.changes === 0) {
      throw fastify.httpErrors.notFound('Post não encontrado')
    }
    return { message: 'Post deletado com sucesso' }
  })
}

module.exports = routes
