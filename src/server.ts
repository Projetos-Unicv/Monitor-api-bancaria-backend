import express from 'express';
import 'dotenv/config'; // Importando variáveis de ambiente
import './server/shared/services/Translations'; // Importando tradução dos erros do Yup
import { router } from './server/shared/http/routes'; // routes
import { AppDataSource } from './data-source'; // Typeorm dataBase
import cors from 'cors';
import { handleAxiosError } from './server/shared/errors/ErrorAxios'; // erros
import { ReqAll } from './server/api/RequestAll'; // função que percorre lista e faz consulta na tecnospeed

// Inicializando o banco de dados
// Lista de bancos para percorrer no back-end
const lista = [
  'CONTA_BB',
  'CONTA_SANTANDER',
  'CONTA_BANRISUL',
  'CONTA_CAIXA',
  'CONTA_ITAU_V2',
  'CONTA_ITAU_FRANCESA',
  'CONTA_SICOOB',
  'CONTA_SICREDI_V2',
  'CONTA_SICREDI_V3',
  'CONTA_INTER',
];
const fetchData = async () => {
  try {
    await ReqAll(lista); // Aguarda a resolução da função
  } catch (error) {
    console.error('Erro ao buscar dados:', error); // Captura e exibe erros se ocorrerem
    handleAxiosError(error);
  }
};

AppDataSource.initialize()
  .then(() => {
    // Se a conexão for bem-sucedida, inicializa o servidor

    const server = express();
    //deixando api publica para o front-end
    server.use(cors());
    server.use(express.json());
    server.use(router);

    const port = process.env.PORT || 3000; // Porta definida no .env ou 3000 como padrão
    server.listen(port, () => {
      console.log(' ');
      console.log('************************');
      console.log(`Servidor rodando na porta ${port}`);
      fetchData();
      setInterval(fetchData, 300000);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o banco de dados:', error);
  });
