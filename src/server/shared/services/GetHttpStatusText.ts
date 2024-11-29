import { HttpStatus } from '../../modules/Record/enums/HttpStatus';

// função para retonar código de resposta da requisição em detalhamento
export const getHttpStatusText = async (
  statusCode: string
): Promise<string> => {
  if (statusCode)
    switch (statusCode) {
      case HttpStatus.Success:
        return 'Success';
      case HttpStatus.BadRequest:
        return 'Bad Request';
      case HttpStatus.Unauthorized:
        return 'Unauthorized';
      case HttpStatus.Forbidden:
        return 'Forbidden';
      case HttpStatus.UnprocessableEntity:
        return 'Unprocessable Entity';
      case HttpStatus.InternalServerError:
        return 'Internal Server Error';
      case HttpStatus.GatewayTimeout:
        return 'Gateway Timeout';
      default:
        return 'Unknown Status';
    }
};
