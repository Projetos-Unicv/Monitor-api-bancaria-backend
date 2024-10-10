import express from 'express';
import 'dotenv/config'; // Importando variáveis de ambiente
import './server/shared/services/Translations'; // Importando tradução dos erros yup
import { router } from './server/shared/http/routes';
import { AppDataSource } from './data-source';
import cors from 'cors';
import { AllReqs } from './server/api/AllRequest';
import { handleAxiosError } from './server/shared/errors/ErrorAxios';
// Inicializando o banco de dados
const fetchData = async () => {
  try {
    await AllReqs(); // Aguarda a resolução da função
  } catch (error) {
    console.error('Erro ao buscar dados:', error); // Captura e exibe erros se ocorrerem
    handleAxiosError(error);
  }
};
AppDataSource.initialize()
  .then(() => {
    // Se a conexão for bem-sucedida, inicializa o servidor
    const server = express();

    server.use(cors());

    server.use(express.json());
    server.use(router);

    const port = process.env.PORT || 3000; // Porta definida no .env ou 3000 como padrão
    server.listen(port, () => {
      console.log(' ');
      console.log('************************');
      console.log(`Servidor rodando na porta ${port}`);
      // setTimeout(() => {
      //   console.log('Foram 5 Minutos');
      //   fetchData();
      // }, 300000);
      // fetchData();
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o banco de dados:', error);
  });
