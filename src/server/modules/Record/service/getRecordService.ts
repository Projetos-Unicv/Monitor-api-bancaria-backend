import { RecordRepository } from '../repository/RecordRepository';
import { getBankByNameService } from '../../Bank/service/getBankByNameService';
import { FilterTimes } from '../enums/FilterTimes';
import { formatarDataParaBrasil } from '../../../shared/services/ConvertData';
import { StateType } from '../enums/StateType';
import { parseDate } from '../../../shared/services/ParseDate';

// serviço de buscar registro
export class GetRecordsService {
  async execute(
    bank: string,
    type: string,
    filter?: FilterTimes | undefined,
    status?: StateType | undefined
  ) {
    const daada = new Date();
    // services
    const servicebank = new getBankByNameService();
    const banco = await servicebank.execute(bank);
    const Idbank = banco.id;

    let startDate = {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    };
    let endDate = { year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0 };
    endDate = parseDate(daada.toString());
    console.log(endDate);
    startDate = { ...endDate };

    let limit = 0;
    if (filter === 'DAY') {
      startDate.day -= 1;
    } else if (filter === 'WEEK') {
      startDate.day -= 7;
    } else if (filter === 'LAST') {
      limit = 1;
    } else if (filter === 'MOUTH') {
      startDate.month -= 1;
    }
    console.log(startDate);
    console.log(endDate);

    let result;

    // Verifica se o status é indefinido e chama a função adequada
    if (status === undefined) {
      result = await RecordRepository.ListRecordsBetween(
        Idbank,
        type,
        startDate,
        endDate
      );
    } else {
      result = await RecordRepository.ListRecordsByStatus(
        Idbank,
        type,
        limit,
        status
      );
    }

    // renomeia para PT-BR os campos para a requisição
    const arrayRenomeado = result.map((item) => ({
      Tipo: item.type,
      CodigoDaResposta: item.codeResponse,
      Banco: item.bank,
      HoraDaConsulta: item.dateCreated,
      status: item.status,
      TempoDeResposta: `${item.timeRequest} Milissegundos`,
      payloadResponse: item.payloadResponse,
      Detalhamento: item.detailing,
      StatusDaResposta: item.responseStatus,
    }));

    // Verifica se result existe e contém pelo menos um registro
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
