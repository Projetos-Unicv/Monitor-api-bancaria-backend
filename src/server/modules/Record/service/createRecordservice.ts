import { Bank } from '../../../shared/database/entities/Bank';
import { PositiveCodeRequest } from '../../../shared/enums/CodeRequest';
import { BankRepository } from '../../Bank/repository/BankRespository';
import { getBankByCodeService } from '../../Bank/service/getBankByCodeService';
import { StateType } from '../enums/StateType';
import { TypeRequest } from '../enums/TypeRequest';
import { ICreateRecord } from '../interfaces/ICreateRecord';
import { RecordRepository } from '../repository/RecordRepository';

export class createRecordsService {
  async execute(info: ICreateRecord) {
    const bancoCode = info.bancoCode;
    const codeResponse = info.codeResponse;
    const type = info.type;
    const timeReq = info.timeReq;
    const payload = info.payload;
    let status: StateType;

    const repo = RecordRepository;
    const bankService = new getBankByCodeService();
    const bank = await bankService.execute(bancoCode);
    const codigosPositivos = Object.values(PositiveCodeRequest);

    if (codigosPositivos.includes(Number(codeResponse))) {
      status = StateType.ativo;
    } else {
      status = StateType.inativo;
    }
    const tete = await repo.CreateRecord(
      type,
      codeResponse,
      status,
      timeReq,
      payload,
      bank
    );
  }
}
