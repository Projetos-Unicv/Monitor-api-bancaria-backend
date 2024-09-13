import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { recordInterface } from "../../interfaces/record-Interface";
import { Bank } from "./Bank";

@Entity("records")
export class Record implements recordInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  type: string;

  @Column({ type: "int" })
  status_code: string;

  @ManyToOne(() => Bank, (bank) => bank.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "bank_id" })
  id_bank: Bank;

  @CreateDateColumn({ type: "timestamp" })
  date_created: Date;

  @Column({ type: "text" })
  teste: string;

  @Column({ type: "varchar", length: 10 })
  status: string;

  @Column({ type: "int" })
  request_time: number;

  @Column({ type: "jsonb" })
  payload_response: object;
}
