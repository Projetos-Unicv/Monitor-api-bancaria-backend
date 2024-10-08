export const formatarDataParaBrasil = (data: Date): string => {
  return data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};
