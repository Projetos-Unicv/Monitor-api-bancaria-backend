import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

import { recordInterface } from "../../interfaces/record-Interface";

@Entity("records")
export class Record implements recordInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  type: string;

  @Column({ type: "int" })
  status_code: string;

  @Column({ type: "varchar", length: 50 })
  cod_banco: number;

  @CreateDateColumn({ type: "timestamp" })
  date_created: Date;

  @Column({ type: "varchar", length: 10 })
  status: string;

  @Column({ type: "int" })
  request_time: number;

  @Column({ type: "jsonb" })
  payload_response: JSON;
}
