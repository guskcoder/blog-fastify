const postSchema = {
  type: 'object',
  required: ['title', 'content'],
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    content: { type: 'string' },
    created_at: { type: 'string', format: 'date-time' }
  }
}

const getPostsSchema = {
  response: {
    200: {
      type: 'array',
      items: postSchema
    }
  }
}

const getPostSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  response: {
    200: postSchema
  }
}

const createPostSchema = {
  body: {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { type: 'string' },
      content: { type: 'string' }
    }
  },
  response: {
    201: postSchema
  }
}

const updatePostSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { type: 'string' },
      content: { type: 'string' }
    }
  },
  response: {
    200: postSchema
  }
}

module.exports = {
  getPostsSchema,
  getPostSchema,
  createPostSchema,
  updatePostSchema
}
