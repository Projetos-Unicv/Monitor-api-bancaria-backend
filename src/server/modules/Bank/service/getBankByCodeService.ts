import { BankRepository } from '../repository/BankRespository';
import AppError from '../../../shared/errors/AppError';
import { Bank } from '../../../shared/database/entities/Bank';
export class getBankByCodeService {
  async execute(bank: number): Promise<Bank> {
    const result = await BankRepository.findBankBycode(bank);
    if (!result) {
      throw new AppError(`Não existe nenhum banco com o Code ${bank} `);
    }
    return result;
  }
}
