module.exports = {
  ok: (data) => ({
    code: 200,
    status: true,
    message: 'Success',
    body: data,
  }),
  created: (data) => ({
    code: 201,
    status: true,
    message: 'Created',
    body: data,
  }),
}
