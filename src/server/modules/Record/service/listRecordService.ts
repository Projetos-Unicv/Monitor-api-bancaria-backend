import { formatarDataParaBrasil } from '../../../shared/services/ConvertData';
import { parseDate } from '../../../shared/services/ParseDate';
import { bankOptions } from '../../Bank/enums/Banks';
import { getBankByNameService } from '../../Bank/service/getBankByNameService';
import { StateType } from '../enums/StateType';
import { TypeRequest } from '../enums/TypeRequest';
import { RecordRepository } from '../repository/RecordRepository';

export class listRecordService {
  async execute(
    bank: bankOptions,
    type: TypeRequest,
    startDate: string,
    endDate: string,
    status?: StateType | undefined
  ) {
    const servicebank = new getBankByNameService();
    const banco = await servicebank.execute(bank);
    const Idbank = banco.id;
    let initDate = {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    };
    let finalDate = {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    };
    initDate = parseDate(startDate);
    finalDate = parseDate(endDate);

    let result;
    let limit = 2;

    if (status === undefined) {
      result = await RecordRepository.ListRecordsBetween(
        Idbank,
        type,
        initDate,
        finalDate
      );
    } else {
      result = await RecordRepository.ListRecordsByStatus(
        Idbank,
        type,
        limit,
        status
      );
    }
    const arrayRenomeado = result.map((item) => ({
      Tipo: item.type,
      CodigoDaResposta: item.codeResponse,
      Banco: item.bank,
      HoraDaConsulta: item.dateCreated,
      Status: item.status,
      TempoDeResposta: `${item.timeRequest} Milissegundos`,
      PayloadResponse: item.payloadResponse,
      Detalhamento: item.detailing,
      StatusDaResposta: item.responseStatus,
    }));
    if (Array.isArray(result) && result.length > 0) {
      // Formata o campo dateCreated de cada registro
      const registrosFormatados = arrayRenomeado.map((record: any) => ({
        ...record,
        HoraDaConsulta: formatarDataParaBrasil(new Date(record.HoraDaConsulta)),
      }));
      return registrosFormatados;
    }

    // Caso não haja registros, retorna uma lista vazia ou null
    return [];
  }
}
