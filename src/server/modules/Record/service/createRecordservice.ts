import { Bank } from '../../../shared/database/entities/Bank';
import { PositiveCodeRequest } from '../../../shared/enums/CodeRequest';
import { ConvertResponseStatus } from '../../../shared/services/ConvertResponseStatus';
import { getHttpStatusText } from '../../../shared/services/GetHttpStatusText';
import { BankRepository } from '../../Bank/repository/BankRespository';
import { getBankByCodeService } from '../../Bank/service/getBankByCodeService';
import { getBankByNameService } from '../../Bank/service/getBankByNameService';
import { StateType } from '../enums/StateType';
import { TypeRequest } from '../enums/TypeRequest';
import { ICreateRecord } from '../interfaces/ICreateRecord';
import { RecordRepository } from '../repository/RecordRepository';

export class createRecordsService {
  async execute(info: ICreateRecord, nameBank: string) {
    //serviços
    const bankService = new getBankByNameService();
    const repo = RecordRepository;

    //Parametroas
    const bancoCode = info.bancoCode;
    const codeResponse = info.codeResponse;
    const type = info.type;
    const timeReq = info.timeReq;
    const payload = info.payload;

    //Resposta de services
    const bank = await bankService.execute(nameBank);
    const codigosPositivos = Object.values(PositiveCodeRequest);
    const detailing = await getHttpStatusText(Number(codeResponse));

    // operação base
    let status: StateType;
    if (codigosPositivos.includes(Number(codeResponse))) {
      status = StateType.ativo;
    } else {
      status = StateType.inativo;
    }
    const responseTime = await ConvertResponseStatus(timeReq, status);

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
