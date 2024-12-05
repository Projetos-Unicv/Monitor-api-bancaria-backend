import { PositiveCodeRequest } from '../../shared/enums/PositiveCodeRequest';
import { api } from '../api';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';
import { CedenteInterface } from '../interfaces/CedenteInterface';
import { BodyDefault } from './BodyDefault';

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
      type: 'registro',
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
    type: 'registro',
    codeResponse: codeError,
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
    ...BodyDefault, // BodyDefault definido
    ...DadosCedentes, // Adiciona dados do cedente ao requestBody
  };

  try {
    const response = await api.post(`/v1/boletos`, requestBody); // Realiza a requisição de POST
    const end = performance.now(); // Captura o tempo final
    const ReqTime = (end - start).toFixed(); // Tempo de resposta
    const payload = response.data;

    return {
      TempoReq: ReqTime,
      type: 'registro',
      codeResponse: response.status,
      message: `${response.status}: requisição feita, API online.`,
      payload,
    };
  } catch (error) {
    return handleApiError(error, start);
  }
};
