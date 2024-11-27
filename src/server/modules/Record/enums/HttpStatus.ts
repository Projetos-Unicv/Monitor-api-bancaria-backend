// enusm das possiveis respostas da requisição do plugboleto
export enum HttpStatus {
  Success = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  UnprocessableEntity = 422,
  InternalServerError = 500,
  NotImplemented = 501,
}
