module.exports = {
  notFound: (message) => ({
    code: 404,
    status: false,
    message: message || 'Not found',
  }),
  badRequest: (errors) => ({
    code: 400,
    status: false,
    message: 'Bad request',
    body: errors || undefined,
  }),
  unauthorized: (errors) => ({
    code: 401,
    status: false,
    message: 'Unauthorized',
    body: errors || undefined,
  }),
  forbidden: (errors) => ({
    code: 403,
    status: false,
    message: 'Forbidden',
    body: errors || undefined,
  }),
  internalServerError: (errors) => ({
    code: 500,
    status: false,
    message: 'Internal server error',
    body: errors || undefined,
  }),
  databaseError: (error) => ({
    code: 500,
    status: false,
    message: 'Database error',
    body: error,
  }),
}
