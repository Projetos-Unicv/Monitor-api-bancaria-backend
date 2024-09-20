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
  codeResponse: string;

  @ManyToOne(() => Bank, (bank) => bank.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "bankId" })
  idBank: Bank;

  @CreateDateColumn({ type: "timestamp" })
  dateCreated: Date;

  @Column({ type: "varchar", length: 10 })
  status: string;

  @Column({ type: "int" })
  timeRequest: number;

  @Column({ type: "jsonb" })
  payloadResponse: object;
}
