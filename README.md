# Blog API com Fastify

API RESTful para um blog usando Fastify, SQLite e arquitetura baseada em plugins.

## Instalação

```bash
npm install
```

## Executando o projeto

Para desenvolvimento:
```bash
npm run dev
```

Para produção:
```bash
npm start
```

## Endpoints

- GET /posts - Lista todos os posts
- GET /posts/:id - Obtém um post específico
- POST /posts - Cria um novo post
- PUT /posts/:id - Atualiza um post existente
- DELETE /posts/:id - Remove um post

## Documentação

A documentação Swagger está disponível em `/documentation` quando o servidor estiver rodando.
