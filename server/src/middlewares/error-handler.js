export default class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}

export const useError = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

export function errors(err, req, res, next) {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Erro no servidor, contate o administrador'

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Valor do campo: '${Object.keys(
      err.keyValue
    )}' já cadastrado`
    err = new ErrorHandler(message, 400)
  }

  return res
    .status(err.statusCode)
    .json({ success: false, message: err.message })
}
