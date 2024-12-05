import { PositiveCodeRequest } from '../../../shared/enums/CodeRequest';
import { ConvertResponseStatus } from '../../../shared/services/ConvertResponseStatus';
import { getHttpStatusText } from '../../../shared/services/GetHttpStatusText';
import { getBankByNameService } from '../../Bank/service/getBankByNameService';
import { StateType } from '../enums/StateType';
import { ICreateRecord } from '../interfaces/ICreateRecord';
import { RecordRepository } from '../repository/RecordRepository';

// serviço de criar registro no banco de dados
export class createRecordsService {
  async execute(info: ICreateRecord, nameBank: string) {
    //serviços
    const bankService = new getBankByNameService();
    const repo = RecordRepository;

    //Parametros
    const codeResponse = info.codeResponse;
    const type = info.type;
    const timeReq = info.timeReq;
    const payload = info.payload;

    //Resposta de services
    const bank = await bankService.execute(nameBank);
    const codigosPositivos = Object.values(PositiveCodeRequest);
    const detailing = await getHttpStatusText(Number(codeResponse));

    if (typeof codeResponse === 'string') {
      console.log('código da resposta com erro', codeResponse);
    }
    // operação base para descobrir o status da requisição
    let status: StateType;
    if (codigosPositivos.includes(Number(codeResponse))) {
      status = StateType.ativo;
    } else {
      status = StateType.inativo;
    }

    // serviço para saber a indicador do tempo de resposta da requisição
    const responseTime = await ConvertResponseStatus(timeReq, status);

    // cria o registro
    await repo.CreateRecord(
      type,
      codeResponse,
      status,
      timeReq,
      payload,
      bank,
      detailing,
      responseTime
    );
  }
}
