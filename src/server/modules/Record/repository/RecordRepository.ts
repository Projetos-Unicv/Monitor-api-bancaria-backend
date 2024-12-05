import { Record } from '../../../shared/database/entities/Record';
import { AppDataSource } from '../../../../data-source';
import { TypeRequest } from '../enums/TypeRequest';
import { StateType } from '../enums/StateType';
import { Bank } from '../../../shared/database/entities/Bank';

// reposiório dos registros
export const RecordRepository = AppDataSource.getRepository(Record).extend({
  //listagem de registros
  ListRecords(bankId: number, type: string, limit: number) {
    // caso de uso = verificar se o banco está ativo com base na última requisição
    if (limit === 1) {
      return this.createQueryBuilder('records')
        .where('records.type = :type', { type })
        .andWhere('records.bankId = :bankId', { bankId })
        .orderBy('records.dateCreated', 'DESC') // Ordena de mais recente para mais antigo
        .take(1) // Limita a 1 registro
        .getMany(); // Retorna apenas o primeiro (último criado)
    }
    //listagem padrão de registros
    return this.createQueryBuilder('records')
      .where('records.type = :type', { type })
      .andWhere('records.bankId =:bankId', { bankId })
      .orderBy('records.dateCreated', 'ASC') // Ordena de mais antigo para mais novo
      .take(limit) // Limita a quantidade de registros
      .getMany(); // Retorna uma lista de registros
  },
  //listagem por status
  ListRecordsByStatus(
    bankId: number,
    type: string,
    limit: number,
    status: string
  ) {
    // caso de uso = verificar se o banco está ativo com base na última requisição
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
      //caso de uso = popular tabela no front end com erros de cada bacno
      return this.createQueryBuilder('records')
        .where('records.type = :type', { type })
        .andWhere('records.bankId = :bankId', { bankId })
        .andWhere('records.status = :status', { status })
        .orderBy('records.dateCreated', 'ASC') // Ordena de mais antigo para mais novo
        .take(limit) // Limita a quantidade de registros
        .getMany(); // Retorna uma lista de registros
    }
  },
  //criar um registro no banco
  CreateRecord(
    type: TypeRequest,
    CodeResponse: number,
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
