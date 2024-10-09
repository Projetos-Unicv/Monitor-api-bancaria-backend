import { CedenteInterface } from '../../api/interfaces/CedenteInterface';

export const convert_Env = async (
  varEnv: string | undefined
): Promise<CedenteInterface> => {
  const json = JSON.parse(varEnv ?? '');
  return json;
};
