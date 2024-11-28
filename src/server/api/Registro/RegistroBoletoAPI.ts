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

// função para realizar o registro de boleto no plugboleto
export const RegistroBoleto = async (
  cedente: CedenteInterface
): Promise<ApiBodyInterface> => {
  //dados do banco
  let DadosCedentes = {
    CedenteContaNumero: `${cedente.CEDENTE_CONTA_NUMERO}`,
    CedenteContaNumeroDV: `${cedente.CEDENTE_CONTA_NUMERO_DV}`,
    CedenteConvenioNumero: `${cedente.CEDENTE_CONVENIO_NUMERO}`,
    CedenteContaCodigoBanco: `${cedente.CEDENTE_CONTA_CODIGO_BANCO}`,
  };
  const start = performance.now(); // Captura o tempo inicial
  const requestBody = {
    ...BodyDefault, // Presumindo que BodyDefault esteja definido em outro lugar
    ...DadosCedentes, // Adiciona dados do cedente ao requestBody
  };

  try {
    const response = await api.post(`/v1/boletos`, requestBody); //realiza a requisição de POST
    const end = performance.now(); // Captura o tempo final
    const ReqTime = (end - start).toFixed(); // tempo de resposta
    const payload = response.data;
    const registro = {
      TempoReq: ReqTime,
      payload,
      type: 'registro',
      codeResponse: response.status,
    };
    return registro; // retorna a resposta da requisição
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const { status, data } = axiosError.response;

      // caso de respostas positivas
      if ([400, 401, 403, 422].includes(status)) {
        const end = performance.now();
        // tempo de resposta atraves de uma operação matematica
        const ReqTime = (end - start).toFixed();

        const errorResponse = {
          TempoReq: ReqTime,
          type: 'registro',
          codeResponse: status,
          message: `${status}: requisição feita, api online.`,
          payload: data,
        };

        return errorResponse;

        // caso de respostas negativas
      } else if ([500, 504].includes(status)) {
        const end = performance.now();

        const ReqTime = (end - start).toFixed();

        const errorResponse = {
          TempoReq: ReqTime,
          type: 'registro',
          codeResponse: status,
          message: `Erro ${status}: Ocorreu um problema na requisição, api offline.`,
          payload: data,
        };
        console.warn(errorResponse.message, errorResponse.payload);

        return errorResponse;

        // em caso de respostas negativas do tipo text, e respostas não esperadas
      } else {
        const end = performance.now();

        const ReqTime = (end - start).toFixed(); // tempo da requisição

        // respostas da requisição
        const errorResponse = {
          TempoReq: ReqTime,
          type: 'registro',
          codeResponse: status,
          message: `Erro ${status}: Ocorreu um problema na requisição, api offline.`,
          payload: data,
        };
        console.warn(errorResponse.message, errorResponse.payload);

        return errorResponse;
      }
    }
    // Tratamento para outros erros não esperados
    console.error('Erro inesperado ao buscar dados da API(Registro):', error);
    throw error;
  }
};
