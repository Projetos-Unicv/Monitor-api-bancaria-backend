import express from "express";
import "dotenv/config"; // Importando variáveis de ambiente
import "./server/shared/services/Translations"; // Importando tradução dos erros yup
import { router } from "./server/shared/http/routes";
import { AppDataSource } from "./data-source";

// Inicializando o banco de dados
AppDataSource.initialize()
  .then(() => {
    // Se a conexão for bem-sucedida, inicializa o servidor
    const server = express();

    server.use(express.json());
    server.use(router);

    const port = process.env.PORT || 3000; // Porta definida no .env ou 3000 como padrão
    server.listen(port, () => {
      console.log(" ");
      console.log("************************");
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao inicializar o banco de dados:", error);
  });
