import { Record } from '../../../shared/database/entities/Record';
import { AppDataSource } from '../../../../data-source';

export const RecordRepository = AppDataSource.getRepository(Record).extend({
  ListRecords(codeBank: number, type: string, limit: number) {
    return this.createQueryBuilder('records')
      .where('records.type = :type', { type })
      .andWhere('records.bankCode =:codeBank', { codeBank })
      .take(limit) // Limita a quantidade de registros
      .getMany(); // Retorna uma lista de registros
  },
});
