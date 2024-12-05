import { api } from '../api';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';
import { CedenteInterface } from '../interfaces/CedenteInterface';
import { BodyDefault } from './BodyDefault';

interface AxiosError {
  response?: {
    status: number;
    data: any;
  };
}

const handleApiError = (
  error: unknown,
  startTime: number
): ApiBodyInterface => {
  const end = performance.now();
  const ReqTime = (end - startTime).toFixed();
  const axiosError = error as AxiosError;

  if (axiosError.response) {
    const { status, data } = axiosError.response;

    return {
      TempoReq: ReqTime,
      type: 'registro',
      codeResponse: status,
      message: `[${status}] ${
        [200, 400, 401, 403, 422].includes(status)
          ? 'Requisição feita, API online, mas ocorreu um problema.'
          : 'Ocorreu um problema na requisição, API offline.'
      }`,
      payload: data,
    };
  }

  console.error('Erro inesperado ao registrar boleto:', error);

  return {
    TempoReq: ReqTime,
    type: 'registro',
    codeResponse: 0,
    message: 'Erro inesperado ao registrar o boleto.',
    payload: error instanceof Error ? error.message : error,
    erro: true,
  };
};

// Função para realizar o registro de boleto no plugboleto
export const RegistroBoleto = async (
  cedente: CedenteInterface
): Promise<ApiBodyInterface> => {
  const DadosCedentes = {
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
    const response = await api.post(`/v1/boletos`, requestBody); // Realiza a requisição de POST
    const end = performance.now(); // Captura o tempo final
    const ReqTime = (end - start).toFixed(); // Tempo de resposta
    const payload = response.data;

    return {
      TempoReq: ReqTime,
      payload,
      type: 'registro',
      codeResponse: response.status,
      message: `${response.status}: requisição feita, API online.`,
    };
  } catch (error) {
    return handleApiError(error, start);
  }
};
