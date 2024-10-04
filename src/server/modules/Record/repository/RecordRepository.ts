import { Record } from '../../../shared/database/entities/Record';
import { AppDataSource } from '../../../../data-source';

export const RecordRepository = AppDataSource.getRepository(Record).extend({
  ListRecords(codeBank: number, type: string, limit: number) {
    return this.createQueryBuilder('records')
      .where('records.type = :type', { type })
      .andWhere('records.bankId =:codeBank', { codeBank })
      .take(limit) // Limita a quantidade de registros
      .getMany(); // Retorna uma lista de registros
  },
  listRecordsByStatus(
    bankId: number,
    type: string,
    limit: number,
    status: string
  ) {
    {
      return this.createQueryBuilder('records')
        .where('records.type = :type', { type })
        .andWhere('records.bankId = :bankId', { bankId })
        .andWhere('records.status = :status', { status })
        .take(limit) // Limita a quantidade de registros
        .getMany(); // Retorna uma lista de registros
    }
  },
});
