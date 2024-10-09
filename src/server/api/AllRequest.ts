import { TypeRequest } from '../modules/Record/enums/TypeRequest';
import { createRecordsService } from '../modules/Record/service/createRecordservice';
import { RegistroBoleto } from './Registro/RegistroBoletoAPI';

export const AllReqs = async () => {
  const cedente = {
    CedenteContaNumero: '123456',
    CedenteContaNumeroDV: '6',
    CedenteConvenioNumero: '123456',
    CedenteContaCodigoBanco: '033',
  };

  try {
    const data = await RegistroBoleto(cedente); // Chamada assíncrona

    const tempReq = Number(data.TempoReq); // Tempo da requisição
    var type: TypeRequest = TypeRequest.REGISTRO; //tipo do api  do boleto
    const codeResponse = data.codeResponse.toString(); // Código de resposta
    const payload = data.details; // Payload da resposta

    const service = new createRecordsService();
    service.execute(tempReq, type, codeResponse, payload, 1);

    return data; // Retorna os dados para quem chamar a função
  } catch (error) {
    console.error('Erro ao consumir RegistroBoleto:', error);
    throw error; // Lança o erro para ser tratado em outro lugar, se necessário
  }
};
