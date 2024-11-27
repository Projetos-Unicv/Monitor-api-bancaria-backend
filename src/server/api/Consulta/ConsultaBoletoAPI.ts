import { api } from '../api';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';
import { CedenteInterface } from '../interfaces/CedenteInterface';

// paramtros do erro de api
interface AxiosError {
  response?: {
    status: number;
    data: any;
  };
}

export const ConsultaBoleto = async (
  cedente: CedenteInterface
): Promise<ApiBodyInterface> => {
  const start = performance.now(); // Captura o tempo inicial, para fazer a conta do tempo de resposta
  const ID_INTEGRACAO = cedente.ID_INTEGRACAO;
  try {
    const response = await api.get(`/v1/boletos?idintegracao=${ID_INTEGRACAO}`); // consultando boleto
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

      // condiçao de respostas positivas
      if ([400, 401, 403, 422].includes(status)) {
        // terminando o tempo da requisição
        const end = performance.now();
        const ReqTime = (end - start).toFixed();

        const errorResponse = {
          TempoReq: ReqTime,
          type: 'consulta',
          codeResponse: status,
          message: `${status}: requisição feita, api online.`,
          details: data,
        };

        return errorResponse;

        // condição de respostas negativas
      } else if ([500, 504].includes(status)) {
        // terminando o tempo da requisição
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
      } else {
        // em caso de erros do tipo texto e respostas de erros negativas
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
