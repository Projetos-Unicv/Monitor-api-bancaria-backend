import { Bank } from '../../../shared/database/entities/Bank';
import { PositiveCodeRequest } from '../../../shared/enums/CodeRequest';
import { BankRepository } from '../../Bank/repository/BankRespository';
import { getBankByCodeService } from '../../Bank/service/getBankByCodeService';
import { StateType } from '../enums/StateType';
import { TypeRequest } from '../enums/TypeRequest';
import { RecordRepository } from '../repository/RecordRepository';

export class createRecordsService {
  async execute(
    timeReq: number,
    type: TypeRequest,
    codeResponse: string,
    payload: object,
    bancoCode: number
  ) {
    let status: StateType;
    const repo = RecordRepository;
    const bankService = new getBankByCodeService();
    const bank = await bankService.execute(bancoCode);
    const codigosPositivos = Object.values(PositiveCodeRequest);

    if (codigosPositivos.includes(codeResponse)) {
      console.log('teste passou');
      status = StateType.ativo;
    } else {
      console.log(codeResponse);
      console.log('veio no else');
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
    console.log(tete);
  }
}
