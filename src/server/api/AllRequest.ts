import { RegistroBoleto } from './Registro/RegistroBoletoAPI';

export const AllReqs = async () => {
  const cedente = {
    CedenteContaNumero: '123456',
    CedenteContaNumeroDV: '6',
    CedenteConvenioNumero: '123456',
    CedenteContaCodigoBanco: '033',
  };

  const data = await RegistroBoleto(cedente);
  return data;
};
