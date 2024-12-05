import { PositiveCodeRequest } from '../../shared/enums/PositiveCodeRequest';
import { api } from '../api';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';
import { CedenteInterface } from '../interfaces/CedenteInterface';

// Parâmetros do erro de API
interface AxiosError {
  response?: {
    status: number;
    data: any;
  };
}

// Função para tratar erros da API
const handleApiError = (error: any, startTime: number): ApiBodyInterface => {
  const end = performance.now();
  const ReqTime = (end - startTime).toFixed();
  const axiosError = error as AxiosError;

  if (axiosError.response) {
    const { status, data } = axiosError.response;

    return {
      TempoReq: ReqTime,
      type: 'consulta',
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

  let codeError: number = 0;
  if (error.code === 'ECONNREFUSED') {
    codeError = 111;
  } else if (error.code === 'ECONNRESET') {
    codeError = 104;
  }
  return {
    TempoReq: ReqTime,
    type: 'consulta',
    codeResponse: codeError,
    message: `Erro inesperado ao realizar consulta.`,
    payload: error instanceof Error ? error.message : error,
  };
};

// Função para consultar boleto no plugboleto
export const ConsultaBoleto = async (
  cedente: CedenteInterface
): Promise<ApiBodyInterface> => {
  const start = performance.now(); // Captura o tempo inicial
  const ID_INTEGRACAO = cedente.ID_INTEGRACAO;

  try {
    const response = await api.get(`/v1/boletos?idintegracao=${ID_INTEGRACAO}`); // Consultando boleto
    const end = performance.now(); // Captura o tempo final
    const ReqTime = (end - start).toFixed(); // calcula o tempo de resposta
    const payload = response.data;

    return {
      TempoReq: ReqTime,
      type: 'consulta',
      codeResponse: response.status,
      message: `${response.status}: requisição feita, API online.`,
      payload,
    };
  } catch (error) {
    return handleApiError(error, start);
  }
};
