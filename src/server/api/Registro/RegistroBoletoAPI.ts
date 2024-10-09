import { api } from '../api';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';
import { BodyDefault } from './BodyDefault';

interface AxiosError {
  response?: {
    status: number;
    data: any; // ou um tipo mais específico, se você souber
  };
}

export const RegistroBoleto = async (
  cedente: object
): Promise<ApiBodyInterface> => {
  const start = performance.now(); // Captura o tempo inicial

  const requestBody = {
    ...BodyDefault, // Inclui as propriedades padrão de BodyDefault com cedente
    ...cedente,
  };

  try {
    const response = await api.post(`/boletos`, requestBody);
    const end = performance.now(); // Captura o tempo final
    const ReqTime = (end - start).toFixed(2);
    const payload = response.data;
    const registro = {
      TempoReq: ReqTime,
      payload,
      type: 'registro',
      codeResponse: response.status,
    };
    return registro;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const { status, data } = axiosError.response;

      if ([400, 401, 402, 422, 500, 504].includes(status)) {
        const end = performance.now();
        const ReqTime = (end - start).toFixed();
        const errorResponse = {
          TempoReq: ReqTime,
          type: 'registro',
          codeResponse: status,
          message: `Erro ${status}: Ocorreu um problema na requisição.`,
          details: data,
        };
        console.warn(errorResponse.message, errorResponse.details);
        return errorResponse;
      }
    }

    // Tratamento para outros erros não esperados
    console.error('Erro inesperado ao buscar dados da API(Registro):', error);
    throw error;
  }
};
