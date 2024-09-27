import { BankRepository } from '../../repository/BankRespository';
import { Bank } from '../../../../shared/database/entities/Bank';
import { AppError } from '../../../../shared/errors/AppError';
export class GetBankService {
  async execute(bank: string): Promise<Bank> {
    const result = await BankRepository.ListBankByName(bank);
    if (!result) {
      throw new AppError(`Não existe nenhum banco com o nome ${bank}`, 404);
    }
    return result;
  }
}
