import { PositiveCodeRequest } from '../../shared/enums/PositiveCodeRequest';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';

// Parâmetros do erro de API
interface AxiosError {
  response?: {
    status: number;
    data: any;
  };
}

export const handleApiError = (
  error: any,
  startTime: number,
  type: string
): ApiBodyInterface => {
  const end = performance.now();
  const ReqTime = (end - startTime).toFixed();
  const axiosError = error as AxiosError;
  // Verifica se o erro contém uma resposta da API
  if (axiosError.response) {
    const { status, data } = axiosError.response;

    return {
      TempoReq: ReqTime,
      type: type,
      codeResponse: status,
      message: `[${status}] ${
        Object.values(PositiveCodeRequest).includes(status)
          ? 'Requisição feita, API online, mas ocorreu um problema.'
          : 'Ocorreu um problema na requisição, API offline.'
      }`,
      payload: data,
    };
  }

  console.error('Erro inesperado ao registrar boleto:', error);

  // Define códigos de erro personalizados para erros comuns de rede
  let codeError: number = 0;
  if (error.code === 'ECONNREFUSED') {
    codeError = 111;
  } else if (error.code === 'ECONNRESET') {
    codeError = 104;
  } else if (error.code === 'ENOTFOUND') {
    codeError = 3008;
  }
  return {
    TempoReq: ReqTime,
    type: type,
    codeResponse: codeError,
    message: `Erro inesperado ao realizar ${type}.`,
    payload: error instanceof Error ? error.message : error,
  };
};
