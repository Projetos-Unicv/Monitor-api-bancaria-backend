import { getBankByNameService } from '../../modules/Bank/service/getBankByNameService';
import { TypeRequest } from '../../modules/Record/enums/TypeRequest';
import { ICreateRecord } from '../../modules/Record/interfaces/ICreateRecord';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';

export const ConvertCedenteForRecord = async (
  resu: ApiBodyInterface,
  banco: string
): Promise<ICreateRecord> => {
  const serviceBanco = new getBankByNameService();
  const Bank = await serviceBanco.execute(banco);

  var tipo: TypeRequest;

  if (resu.type === 'consulta') {
    tipo = TypeRequest.CONSULTA;
  } else {
    tipo = TypeRequest.REGISTRO;
  }

  const result: ICreateRecord = {
    bancoCode: Bank.bankCode,
    type: tipo,
    timeReq: Number(resu.TempoReq),
    codeResponse: String(resu.codeResponse),
    payload: resu.payload,
  };
  return result;
};
