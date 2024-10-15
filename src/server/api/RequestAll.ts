import { createRecordsService } from '../modules/Record/service/createRecordservice';
import { convert_Env } from '../shared/services/ConvertEnvToJSON';
import { ConsultaBoleto } from './Consulta/ConsultaBoletoAPI';
import { CedenteInterface } from './interfaces/CedenteInterface';
import { RegistroBoleto } from './Registro/RegistroBoletoAPI';
import { ConvertCedenteForRecord } from './service/ConvertCedenteforObject';

export const ReqAll = async (Env_list: string[]) => {
  let i = 0;
  while (i < Env_list.length) {
    const nameBank = Env_list[i];
    const dotenv = process.env[`${nameBank}`];
    const cedente: CedenteInterface = await convert_Env(dotenv);

    console.log('testee', cedente);
    try {
      const ServiceRegister = new createRecordsService();
      const resultRegister = await RegistroBoleto(cedente, 'v1');
      const resultConsult = await ConsultaBoleto(cedente, 'v1');
      console.log(
        `Registro feito para o banco: ${cedente.NOME_BANCO}`,
        resultRegister
      );
      console.log(
        `Consulta feito para o banco: ${cedente.NOME_BANCO}`,
        resultConsult
      );
      const registro = await ConvertCedenteForRecord(
        resultRegister,
        cedente.NOME_BANCO
      );
      const consulta = await ConvertCedenteForRecord(
        resultConsult,
        cedente.NOME_BANCO
      );
      ServiceRegister.execute(registro);
      ServiceRegister.execute(consulta);
    } catch (error) {
      console.error(
        `Erro ao registrar boleto para o banco: ${cedente.NOME_BANCO}`,
        error
      );
    }
    i++;
  }
  console.log(`${i} Bancos verificados!`);
};
