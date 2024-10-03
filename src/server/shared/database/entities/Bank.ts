import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { bankInterface } from '../../interfaces/bank-Interface';
import { Record } from './Record';

@Entity('banks')
export class Bank implements bankInterface {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'int' })
  bankCode: number;
  @OneToMany(() => Record, (record) => record.bankId)
  record: Record[];
}
