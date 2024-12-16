import { Record } from '../../../shared/database/entities/Record';
import { AppDataSource } from '../../../../data-source';
import { TypeRequest } from '../enums/TypeRequest';
import { StateType } from '../enums/StateType';
import { Bank } from '../../../shared/database/entities/Bank';

// reposiório dos registros
export const RecordRepository = AppDataSource.getRepository(Record).extend({
  //listagem de registros
  ListRecordsBetween(
    bankId: number,
    type: string,
    start: {
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
      second: number;
    },
    end: {
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
      second: number;
    },
    status?: string // status opcional
  ) {
    const query = this.createQueryBuilder('records')
      .where('records.type = :type', { type })
      .andWhere('records.bankId = :bankId', { bankId })
      .andWhere(
        `(
          (records.year > :startYear OR 
            (records.year = :startYear AND records.month > :startMonth) OR 
            (records.year = :startYear AND records.month = :startMonth AND records.day > :startDay) OR 
            (records.year = :startYear AND records.month = :startMonth AND records.day = :startDay AND records.hour > :startHour) OR 
            (records.year = :startYear AND records.month = :startMonth AND records.day = :startDay AND records.hour = :startHour AND records.minute > :startMinute) OR 
            (records.year = :startYear AND records.month = :startMonth AND records.day = :startDay AND records.hour = :startHour AND records.minute = :startMinute AND records.second >= :startSecond))
        ) AND (
          (records.year < :endYear OR 
            (records.year = :endYear AND records.month < :endMonth) OR 
            (records.year = :endYear AND records.month = :endMonth AND records.day < :endDay) OR 
            (records.year = :endYear AND records.month = :endMonth AND records.day = :endDay AND records.hour < :endHour) OR 
            (records.year = :endYear AND records.month = :endMonth AND records.day = :endDay AND records.hour = :endHour AND records.minute < :endMinute) OR 
            (records.year = :endYear AND records.month = :endMonth AND records.day = :endDay AND records.hour = :endHour AND records.minute = :endMinute AND records.second <= :endSecond))
        )`
      )
      .setParameters({
        startYear: start.year,
        startMonth: start.month,
        startDay: start.day,
        startHour: start.hour,
        startMinute: start.minute,
        startSecond: start.second,
        endYear: end.year,
        endMonth: end.month,
        endDay: end.day,
        endHour: end.hour,
        endMinute: end.minute,
        endSecond: end.second,
      })
      .orderBy('records.year', 'ASC')
      .addOrderBy('records.month', 'ASC')
      .addOrderBy('records.day', 'ASC')
      .addOrderBy('records.hour', 'ASC')
      .addOrderBy('records.minute', 'ASC')
      .addOrderBy('records.second', 'ASC');

    // Condicional para o campo 'status' caso ele seja passado
    if (status !== undefined) {
      query.andWhere('records.status = :status', { status });
    }

    return query.getMany();
  },
  //listagem por status
  ListRecordsByStatus(
    bankId: number,
    type: string,
    limit: number,
    status: string | undefined
  ) {
    // caso de uso = verificar se o banco está ativo com base na última requisição
    if (limit === 1 && status !== undefined) {
      return this.createQueryBuilder('records')
        .where('records.type = :type', { type })
        .andWhere('records.bankId = :bankId', { bankId })
        .andWhere('records.status = :status', { status })
        .orderBy('records.dateCreated', 'DESC') // Ordena de mais recente para mais antigo
        .take(limit)
        .getMany();
    }
    if (limit === 1 && status === undefined) {
      return this.createQueryBuilder('records')
        .where('records.type = :type', { type })
        .andWhere('records.bankId = :bankId', { bankId })
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
        .getMany(); // Retorna uma lista de registros
    }
  },
  //Criar um registro no banco
  async CreateRecord(
    type: TypeRequest,
    CodeResponse: number,
    status: StateType,
    timeRequest: number,
    payload: object,
    bankId: Bank,
    detailing: string,
    responseStatus: string
  ) {
    // Obtenha o repositório do Record
    const recordRepository = AppDataSource.getRepository(Record);

    // Crie a instância do Record
    const newRecord = recordRepository.create({
      type,
      codeResponse: CodeResponse,
      status,
      timeRequest,
      payloadResponse: payload,
      bank: bankId,
      detailing,
      responseStatus,
    });

    // Salva a instância, o que irá chamar o @BeforeInsert()
    await recordRepository.save(newRecord);
    return newRecord;
  },
});
