import { BankRepository } from '../repository/BankRespository';
import AppError from '../../../shared/errors/AppError';
import { Bank } from '../../../shared/database/entities/Bank';

// service  para buscar banco pelo nome
export class getBankByNameService {
  async execute(bank: string): Promise<Bank> {
    const result = await BankRepository.ListBankByName(bank);
    if (!result) {
      //caso não tenha retorna err
      throw new AppError(`Não existe nenhum banco com o nome ${bank} `);
    }
    return result;
  }
}
