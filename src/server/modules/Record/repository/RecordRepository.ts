import { Record } from '../../../shared/database/entities/Record';
import { AppDataSource } from '../../../../data-source';

export const RecordRepository = AppDataSource.getRepository(Record).extend({
  ListRecords(bankId: number, type: string, limit: number) {
    return this.createQueryBuilder('records')
      .where('records.type = :type', { type })
      .andWhere('records.bankId =:bankId', { bankId })
      .take(limit) // Limita a quantidade de registros
      .getMany(); // Retorna uma lista de registros
  },
});
