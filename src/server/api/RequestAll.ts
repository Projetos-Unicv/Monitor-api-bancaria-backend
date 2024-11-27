import { createRecordsService } from '../modules/Record/service/createRecordservice';
import { convert_Env } from '../shared/services/ConvertEnvToJSON';
import { ConsultaBoleto } from './Consulta/ConsultaBoletoAPI';
import { CedenteInterface } from './interfaces/CedenteInterface';
import { RegistroBoleto } from './Registro/RegistroBoletoAPI';
import { ConvertCedenteForRecord } from './service/ConvertCedenteforObject';

export const ReqAll = async (Env_list: string[]) => {
  let i = 0; // contador para saber se todos os bancos já foram percorridos
  let erro = 0; // contar o numero de erros e mostrar
  while (i < Env_list.length) {
    const nameBank = Env_list[i];
    const dotenv = process.env[`${nameBank}`];
    const cedente: CedenteInterface = await convert_Env(dotenv);

    try {
      // faz a requisição do banco nos dois tipos de requisição (consulta | requisição)
      const ServiceRegister = new createRecordsService();
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
    } catch (error) {
      // retorna o erro com o nome do banco
      console.error(
        `Erro ao registrar boleto para o banco: ${cedente.NOME_BANCO}`,
        error
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
