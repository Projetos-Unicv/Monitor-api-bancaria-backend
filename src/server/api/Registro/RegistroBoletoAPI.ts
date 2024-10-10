import { api } from '../api';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';
import { CedenteInterface } from '../interfaces/CedenteInterface';
import { BodyDefault } from './BodyDefault';

interface AxiosError {
  response?: {
    status: number;
    data: any; // ou um tipo mais específico, se você souber
  };
}

export const RegistroBoleto = async (
  cedente: CedenteInterface,
  version: string
): Promise<ApiBodyInterface> => {
  let tete = {
    CedenteContaNumero: `${cedente.CEDENTE_CONTA_NUMERO}`,
    CedenteContaNumeroDV: `${cedente.CEDENTE_CONTA_NUMERO_DV}`,
    CedenteConvenioNumero: `${cedente.CEDENTE_CONVENIO_NUMERO}`,
    CedenteContaCodigoBanco: `${cedente.CEDENTE_CONTA_CODIGO_BANCO}`,
  };

  const requestBody = {
    ...BodyDefault, // Presumindo que BodyDefault esteja definido em outro lugar
    ...tete, // Adiciona tete ao requestBody
  };
  const start = performance.now(); // Captura o tempo inicial

  try {
    const response = await api.post(`/${version}/boletos`, requestBody);
    const end = performance.now(); // Captura o tempo final
    const ReqTime = (end - start).toFixed();
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

      if ([400, 401, 403, 422].includes(status)) {
        const end = performance.now();
        const ReqTime = (end - start).toFixed();
        console.log(axiosError);

        const errorResponse = {
          TempoReq: ReqTime,
          type: 'registro',
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
          type: 'registro',
          codeResponse: status,
          message: `Erro ${status}: Ocorreu um problema na requisição, api offline.`,
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