import { Record } from '../../../shared/database/entities/Record';
import { RecordRepository } from '../repository/RecordRepository';
import { GetBankService } from '../../Bank/service/getBankService';
export class GetRecordsService {
  async execute(bank: string, type: string, filter: string): Promise<Record[]> {
    const servicebank = new GetBankService();
    const banco = await servicebank.execute(bank);
    const Idbank = banco.id;
    var limit = 0;
    if (filter == 'DAY') {
      limit = 288;
    } else if (filter == 'WEEK') {
      limit = 2016;
    } else {
      limit = 8640;
    }
    return await RecordRepository.ListRecords(Idbank, type, limit);
  }
}
