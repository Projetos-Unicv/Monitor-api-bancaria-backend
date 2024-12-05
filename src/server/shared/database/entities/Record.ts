import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm'; // importação de funcionalidades do typeorm

import { recordInterface } from '../../interfaces/record-Interface';
import { Bank } from './Bank';

@Entity('records')
export class Record implements recordInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('Type-idx')
  @Column({ type: 'varchar', length: 50, nullable: false })
  type: string;

  @Column({ type: 'int', nullable: false })
  codeResponse: number;

  @Index('Bank-idx')
  @ManyToOne(() => Bank, (bank) => bank.records, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bankId' })
  bank: Bank;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  dateCreated: Date;

  @Index('status-idx')
  @Column({ type: 'varchar', length: 10, nullable: false })
  status: string;

  @Column({ type: 'int', nullable: false })
  timeRequest: number;

  @Column({ type: 'jsonb', nullable: false })
  payloadResponse: object;

  @Column({ type: 'varchar', length: 50, nullable: false })
  detailing: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  responseStatus: string;
}
