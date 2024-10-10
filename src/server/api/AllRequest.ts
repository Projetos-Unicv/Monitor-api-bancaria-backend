import { TypeRequest } from '../modules/Record/enums/TypeRequest';
import { createRecordsService } from '../modules/Record/service/createRecordservice';
import { convert_Env } from '../shared/services/ConvertEnvToJSON';
import { CedenteInterface } from './interfaces/CedenteInterface';
import { RegistroBoleto } from './Registro/RegistroBoletoAPI';

export const AllReqs = async () => {
  const cedente: CedenteInterface = await convert_Env(process.env.CONTA_BB);
  console.log(cedente);
  try {
    const data = await RegistroBoleto(cedente, 'v1'); // Chamada assíncrona

    const tempReq = Number(data.TempoReq); // Tempo da requisição
    const type: TypeRequest = TypeRequest.REGISTRO; //tipo do api  do boleto
    const codeResponse = data.codeResponse.toString(); // Código de resposta
    const payload = data.details; // Payload da resposta

    const service = new createRecordsService();
    service.execute(
      tempReq,
      type,
      codeResponse,
      payload,
      Number(cedente.CEDENTE_CONTA_CODIGO_BANCO)
    );

    return data; // Retorna os dados para quem chamar a função
  } catch (error) {
    console.error('Erro ao consumir RegistroBoleto:', error);
    throw error; // Lança o erro para ser tratado em outro lugar, se necessário
  }
};
