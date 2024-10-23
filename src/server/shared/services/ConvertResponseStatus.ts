import { responseStatusType } from '../../modules/Record/enums/responseStatusType';

export const ConvertResponseStatus = async (
  responseTime: number,
  status: string
): Promise<string> => {
  if (status == 'ativo') {
    if (responseTime < 200) {
      return responseStatusType.Normal; // Resposta normal
    } else if (responseTime >= 200 && responseTime < 500) {
      return responseStatusType.Lenta; // Resposta lenta
    } else if (responseTime >= 500 && responseTime < 1000) {
      return responseStatusType.MuitoLenta; // Resposta um muito lenta
    } else {
      return responseStatusType.Timeout; // Excedeu o tempo limite
    }
  } else {
    return responseStatusType.Erro;
  }
};
