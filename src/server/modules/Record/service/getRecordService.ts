import { RecordRepository } from '../repository/RecordRepository';
import { getBankByNameService } from '../../Bank/service/getBankByNameService';
import { FilterTimes } from '../enums/FilterTimes';
import { formatarDataParaBrasil } from '../../../shared/services/ConvertData';
import { StateType } from '../enums/StateType';

// serviço de buscar registro
export class GetRecordsService {
  async execute(
    bank: string,
    type: string,
    filter?: FilterTimes | undefined,
    status?: StateType | undefined
  ) {
    // services
    const servicebank = new getBankByNameService();
    const banco = await servicebank.execute(bank);
    const Idbank = banco.id;

    // Definindo o limite com base no filtro
    // um dia são feitas 288 requisições de 5 em 5 minutos
    // e assim em diante
    let limit = 0;
    if (filter === 'DAY') {
      limit = 288;
    } else if (filter === 'WEEK') {
      limit = 2016;
    } else if (filter === 'LAST') {
      limit = 1;
    } else {
      limit = 8640;
    }
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
