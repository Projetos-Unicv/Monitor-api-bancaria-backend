import { api } from '../api';
import { BodyDefault } from './BodyDefault';

export const RegistroBoleto = async (
  cedente: object
): Promise<string | object> => {
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

    return payload;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
};
