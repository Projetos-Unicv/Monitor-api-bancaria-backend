import { getBankByCodeService } from '../modules/Bank/service/getBankByCodeService';
import { TypeRequest } from '../modules/Record/enums/TypeRequest';
import { ICreateRecord } from '../modules/Record/interfaces/ICreateRecord';
import { createRecordsService } from '../modules/Record/service/createRecordservice';
import { Bank } from '../shared/database/entities/Bank';
import { convert_Env } from '../shared/services/ConvertEnvToJSON';
import { ConsultaBoleto } from './Consulta/ConsultaBoletoAPI';
import { CedenteInterface } from './interfaces/CedenteInterface';
import { RegistroBoleto } from './Registro/RegistroBoletoAPI';
import { ConvertCedenteForRecord } from './service/ConvertCedenteforObject';

export const ReqAll = async (Env_list: string[]) => {
  //service de registrar no banco
  const ServiceRegister = new createRecordsService();
  const serviceBankCode = new getBankByCodeService();
  let i = 0; // contador para saber se todos os bancos já foram percorridos
  let erro = 0; // contar o numero de erros e mostrar
  while (i < Env_list.length) {
    const nameBank = Env_list[i]; // buscando o nome do banco na lista
    const dotenv = process.env[`${nameBank}`]; // Pegando o dados do dotenv com base no nome que está na lista
    const cedente: CedenteInterface = await convert_Env(dotenv); // convertendo o cedente do banco em Objeto

    try {
      // resultado do ping no servidor
      // faz a requisição do banco nos dois tipos de requisição (consulta | requisição)
      const resultRegister = await RegistroBoleto(cedente);
      const resultConsult = await ConsultaBoleto(cedente);

      // converte a resposta para objeto
      const registro = await ConvertCedenteForRecord(
        resultRegister,
        cedente.NOME_BANCO
      );
      const consulta = await ConvertCedenteForRecord(
        resultConsult,
        cedente.NOME_BANCO
      );

      // salva o registro no banco
      ServiceRegister.execute(registro, cedente.NOME_BANCO);
      ServiceRegister.execute(consulta, cedente.NOME_BANCO);
    } catch (error: any) {
      // busca o banco pelo código
      const bank: Bank = await serviceBankCode.execute(
        Number(cedente.CEDENTE_CONTA_CODIGO_BANCO)
      );

      //setadno valores da requisição
      const codBank = bank.bankCode;
      const codeError = error.code;
      const nameBank = cedente.NOME_BANCO;
      let type: TypeRequest = error.method;
      const payload = error.data;

      // Analisa o metodo de requisição e dependendo qual for, será consulta ou registro
      if (type === TypeRequest.REGISTRO) {
        type === TypeRequest.REGISTRO;
      } else {
        type === TypeRequest.CONSULTA;
      }

      const ObjetoDaRequisição: ICreateRecord = {
        bancoCode: codBank,
        codeResponse: codeError,
        payload,
        timeReq: 0,
        type,
        detailing: codeError,
      };

      ServiceRegister.execute(ObjetoDaRequisição, nameBank);

      // retorna o erro com o nome do banco
      console.error(
        `Erro ao registrar boleto para o banco: ${cedente.NOME_BANCO}`,
        error.code
      );
      erro++;
    }
    i++;
  }

  //informa a quantidade de bancos verificados e erros
  console.log('');
  console.log('************************');
  console.log('');
  console.log(`${i} Bancos verificados com sucesso!`);
  console.log(`${erro} Bancos com erro!`);
};
