import { Bank } from '../../../shared/database/entities/Bank';
import { AppDataSource } from '../../../../data-source';

export const BankRepository = AppDataSource.getRepository(Bank).extend({
  ListBankByName(bank: string) {
    return this.createQueryBuilder('banks')
      .where('banks.name =:bank', { bank })
      .getOne();
  },
  findBankBycode(bankCode: number) {
    return this.createQueryBuilder('banks')
      .where('banks.bankCode =:bankCode', {
        bankCode,
      })
      .getOne();
  },
});
