import { api } from '../api';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';
import { CedenteInterface } from '../interfaces/CedenteInterface';

interface AxiosError {
  response?: {
    status: number;
    data: any; // ou um tipo mais específico, se você souber
  };
}

export const ConsultaBoleto = async (
  cedente: CedenteInterface
): Promise<ApiBodyInterface> => {
  const start = performance.now(); // Captura o tempo inicial
  const ID_INTEGRACAO = cedente.ID_INTEGRACAO;
  // const version = cedente.VERSAO;
  try {
    const response = await api.get(`/v1/boletos?idintegracao=${ID_INTEGRACAO}`);
    const end = performance.now(); // Captura o tempo final
    const ReqTime = (end - start).toFixed();
    const payload = response.data;
    const registro = {
      TempoReq: ReqTime,
      type: 'consulta',
      codeResponse: response.status,
      message: `${response.status}: requisição feita, api online.`,
      payload,
    };

    return registro;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const { status, data } = axiosError.response;

      if ([400, 401, 403, 422].includes(status)) {
        const end = performance.now();
        const ReqTime = (end - start).toFixed();

        const errorResponse = {
          TempoReq: ReqTime,
          type: 'consulta',
          codeResponse: status,
          message: `${status}: requisição feita, api online.`,
          details: data,
        };
        console.warn(errorResponse.message, errorResponse.details);

        return errorResponse;
      } else if ([500, 504].includes(status)) {
        const end = performance.now();
        const ReqTime = (end - start).toFixed();

        const errorResponse = {
          TempoReq: ReqTime,
          type: 'consulta',
          codeResponse: status,
          message: `Erro ${status}: Ocorreu um problema na requisição, api offline.`,
          details: data,
        };
        console.warn(errorResponse.message, errorResponse.details);

        return errorResponse;
      }
    }

    // Tratamento para outros erros não esperados
    console.error('Erro inesperado ao buscar dados da API(Consulta):', error);
    throw error;
  }
};
