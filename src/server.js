const path = require('path')
const fastify = require('fastify')({
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: true,
      useDefaults: true
    }
  }
})

require('dotenv').config()

// Registra plugins essenciais
fastify.register(require('@fastify/cors'))
fastify.register(require('@fastify/sensible'))

// Configuração do Swagger
fastify.register(require('@fastify/swagger'), {
  openapi: {
    info: {
      title: 'Blog API',
      description: 'Documentação da API do Blog',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {}
    }
  },
  hideUntagged: false
})

// Interface do Swagger
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header
})

// Registra plugins da aplicação usando autoload
fastify.register(require('@fastify/autoload'), {
  dir: path.join(__dirname, 'plugins'),
  options: { ...require('../package.json') }
})

// Registra rotas usando autoload
fastify.register(require('@fastify/autoload'), {
  dir: path.join(__dirname, 'routes'),
  dirNameRoutePrefix: true,
  options: { prefix: '/api' }
})

// Tratamento global de erros
fastify.setErrorHandler(function (error, request, reply) {
  // Log do erro
  this.log.error(error)
  
  // Se for um erro do Fastify, retorna como está
  if (error.validation || error.statusCode) {
    reply.send(error)
    return
  }
  
  // Erro interno do servidor
  reply.status(500).send({
    error: 'Internal Server Error',
    message: 'Ocorreu um erro interno no servidor',
    statusCode: 500
  })
})

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
