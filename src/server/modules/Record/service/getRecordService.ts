import { Record } from '../../../shared/database/entities/Record';
import { RecordRepository } from '../repository/RecordRepository';
import { getBankByNameService } from '../../Bank/service/getBankByNameService';
import { FilterTimes } from '../enums/FilterTimes';
import { formatarDataParaBrasil } from '../../../shared/services/ConvertData';
import { recordInterface } from '../../../shared/interfaces/record-Interface';
import { StateType } from '../enums/StateType';

export class GetRecordsService {
  async execute(
    bank: string,
    type: string,
    filter: FilterTimes | undefined,
    status: StateType | undefined
  ) {
    const servicebank = new getBankByNameService();
    const banco = await servicebank.execute(bank);
    const Idbank = banco.id;

    // Definindo o limite com base no filtro
    let limit = 0;
    console.log(filter);
    if (filter === 'DAY') {
      limit = 288;
    } else if (filter === 'WEEK') {
      limit = 2016;
    } else if (filter === 'LAST') {
      limit = 1;
    } else {
      limit = 8640;
    }
    console.log('Limit dentro do service: ', limit);
    let result;

    // Verifica se o status é indefinido e chama a função adequada
    if (status === undefined) {
      result = await RecordRepository.ListRecords(Idbank, type, limit);
    } else {
      result = await RecordRepository.ListRecordsByStatus(
        Idbank,
        type,
        limit,
        status
      );
    }

    // Verifica se result existe e contém pelo menos um registro
    if (Array.isArray(result) && result.length > 0) {
      // Formata o campo dateCreated de cada registro
      const registrosFormatados = result.map((record: any) => ({
        ...record,
        dateCreated: formatarDataParaBrasil(new Date(record.dateCreated)),
      }));
      return registrosFormatados;
    }

    // Caso não haja registros, retorna uma lista vazia ou null
    return [];
  }
}
