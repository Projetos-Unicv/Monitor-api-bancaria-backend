import { Record } from '../../../shared/database/entities/Record';
import { AppDataSource } from '../../../../data-source';
import { TypeRequest } from '../enums/TypeRequest';
import { StateType } from '../enums/StateType';
import { Bank } from '../../../shared/database/entities/Bank';

export const RecordRepository = AppDataSource.getRepository(Record).extend({
  ListRecords(bankId: number, type: string, limit: number) {
    if (limit === 1) {
      return this.createQueryBuilder('records')
        .where('records.type = :type', { type })
        .andWhere('records.bankId = :bankId', { bankId })
        .orderBy('records.dateCreated', 'DESC') // Ordena de mais recente para mais antigo
        .take(1) // Limita a 1 registro
        .getMany(); // Retorna apenas o primeiro (último criado)
    }
    return this.createQueryBuilder('records')
      .where('records.type = :type', { type })
      .andWhere('records.bankId =:bankId', { bankId })
      .take(limit) // Limita a quantidade de registros
      .getMany(); // Retorna uma lista de registros
  },
  ListRecordsByStatus(
    bankId: number,
    type: string,
    limit: number,
    status: string
  ) {
    if (limit === 1) {
      return this.createQueryBuilder('records')
        .where('records.type = :type', { type })
        .andWhere('records.bankId = :bankId', { bankId })
        .andWhere('records.status = :status', { status })
        .orderBy('records.dateCreated', 'DESC') // Ordena de mais recente para mais antigo
        .take(limit)
        .getMany();
    }
    {
      return this.createQueryBuilder('records')
        .where('records.type = :type', { type })
        .andWhere('records.bankId = :bankId', { bankId })
        .andWhere('records.status = :status', { status })
        .take(limit) // Limita a quantidade de registros
        .getMany(); // Retorna uma lista de registros
    }
  },
  CreateRecord(
    type: TypeRequest,
    CodeResponse: string,
    status: StateType,
    timeRequest: number,
    payload: object,
    bankId: Bank,
    detailing: string,
    responseStatus: string
  ) {
    return this.createQueryBuilder('records')
      .insert()
      .into(Record)
      .values({
        type: type,
        codeResponse: CodeResponse,
        status: status,
        timeRequest: timeRequest,
        payloadResponse: payload,
        bank: bankId,
        detailing: detailing,
        responseStatus,
      })
      .execute();
  },
});
