import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { bankInterface } from "../../interfaces/bank-Interface";

@Entity("banks")
export default class Bank implements bankInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;
}
