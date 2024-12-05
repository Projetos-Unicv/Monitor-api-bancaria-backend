import { getBankByNameService } from '../../modules/Bank/service/getBankByNameService';
import { TypeRequest } from '../../modules/Record/enums/TypeRequest';
import { ICreateRecord } from '../../modules/Record/interfaces/ICreateRecord';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';

// função para converter o cedente em objeto para salvar no banco de dados
export const ConvertCedenteForRecord = async (
  corpoRegistro: ApiBodyInterface,
  banco: string
): Promise<ICreateRecord> => {
  const serviceBanco = new getBankByNameService();
  const Bank = await serviceBanco.execute(banco);

  var tipo: TypeRequest;

  if (corpoRegistro.type === 'consulta') {
    tipo = TypeRequest.CONSULTA;
  } else {
    tipo = TypeRequest.REGISTRO;
  }

  const result: ICreateRecord = {
    bancoCode: Bank.bankCode,
    type: tipo,
    timeReq: Number(corpoRegistro.TempoReq),
    codeResponse: corpoRegistro.codeResponse,
    payload: corpoRegistro.payload,
  };
  return result;
};
