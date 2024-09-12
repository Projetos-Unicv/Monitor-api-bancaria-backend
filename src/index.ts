import { server } from "./server/server";

server.listen(process.env.PORT || 3333, () =>
  console.log(`Escutando na Porta: ${process.env.PORT}`)
);
