import { BankRepository } from '../repository/BankRespository';
import AppError from '../../../shared/errors/AppError';
import { Bank } from '../../../shared/database/entities/Bank';
export class getBankByCodeService {
  // service  para buscar banco pelo código
  async execute(bank: number): Promise<Bank> {
    const result = await BankRepository.findBankBycode(bank);
    if (!result) {
      // caso não tenha retorna
      throw new AppError(`Não existe nenhum banco com o Code ${bank} `);
    }
    return result;
  }
}
