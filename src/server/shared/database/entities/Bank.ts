import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'; // importação de funcionalidades do typeorm

// entidadades para a entidade tipar
import { bankInterface } from '../../interfaces/bank-Interface';
import { Record } from './Record';

@Entity('banks')
export class Bank implements bankInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('name-idx')
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'int' })
  bankCode: number;
  @OneToMany(() => Record, (record) => record.bank)
  records: Record[];
}
