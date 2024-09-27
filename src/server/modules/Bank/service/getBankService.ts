import { BankRepository } from '../repository/BankRespository';
import AppError from '../../../shared/errors/AppError';
import { Bank } from '../../../shared/database/entities/Bank';
export class GetBankService {
  async execute(bank: string): Promise<Bank> {
    const result = await BankRepository.ListBankByName(bank);
    if (!result) {
      throw new AppError(`Não existe nenhum banco com o nome ${bank} `);
    }
    return result;
  }
}
