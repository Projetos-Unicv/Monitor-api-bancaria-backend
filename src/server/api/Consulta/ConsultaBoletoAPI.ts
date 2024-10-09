// export const ConsultaBoleto = async (): Promise<AxiosResponse<any>> => {
//   const start = performance.now(); // Captura o tempo inicial
//   try {
//     const response = await api.get(
//       `/boletos?idintegracao=${process.env.ID_INTEGRACAO}`
//     );
//     // const end = performance.now(); // Captura o tempo final
//     // const ReqTime = (end - start).toFixed(2);
//     // const payload = response.data;
//     // const registro = {
//     //   TempoReq: ReqTime,
//     //   payload,
//     //   type: 'registro',
//     //   codeResponse: response.status,
//     // };

//     console.log(`Requisição completada `, registro);

//     return payload;
//   } catch (error) {
//     console.error('Erro ao buscar dados da API:', error);
//     throw error;
//   }
// };
