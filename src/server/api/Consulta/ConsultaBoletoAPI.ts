import { PositiveCodeRequest } from '../../shared/enums/PositiveCodeRequest';
import { api } from '../api';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';
import { CedenteInterface } from '../interfaces/CedenteInterface';
import { handleApiError } from '../service/handleApiError';

// Parâmetros do erro de API
interface AxiosError {
  response?: {
    status: number;
    data: any;
  };
}

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
    // Função para tratar erros da API
    return handleApiError(error, start, 'consulta');
  }
};
