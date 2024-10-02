import { Record } from '../../../shared/database/entities/Record';
import { RecordRepository } from '../repository/RecordRepository';
import { GetBankService } from '../../Bank/service/getBankService';
import { FilterTimes } from '../enums/FilterTimes';
import { formatarDataParaBrasil } from '../../../shared/services/ConvertData';
import { recordInterface } from '../../../shared/interfaces/record-Interface';

export class GetRecordsService {
  async execute(bank: string, type: string, filter: FilterTimes | undefined) {
    const servicebank = new GetBankService();
    const banco = await servicebank.execute(bank);
    const Idbank = banco.id;

    // Definindo o limite com base no filtro
    let limit = 0;
    if (filter === 'DAY') {
      limit = 288;
    } else if (filter === 'WEEK') {
      limit = 2016;
    } else {
      limit = 8640;
    }

    const result = await RecordRepository.ListRecords(Idbank, type, limit);

    //percorre e verifica se tem pelo menos um registro
    if (result && result.length > 0) {
      //percorre todo o registro
      const registrosFormatados = result.map((record) => ({
        ...record,
        dateCreated: formatarDataParaBrasil(record.dateCreated),
      }));
      return registrosFormatados;
    }
    return;
  }
}
