export const formatarDataParaBrasil = (data: Date): string => {
  const dataLocal = new Date(data.getTime() - data.getTimezoneOffset() * 60000);
  return dataLocal.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};
