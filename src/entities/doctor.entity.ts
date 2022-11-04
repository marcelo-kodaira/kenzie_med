import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Addresses from "./address.entity";
import Schedules from "./schedule.entity";
import Specialties from "./specialty.entity";

@Entity("doctors")
class Doctors {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 200 })
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ length: 11, unique: true })
  CRM: string;

  @Column()
  sex: string;

  @Column()
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Specialties, (specialties) => specialties.doctors)
  specialties: Specialties[];

  @OneToOne(() => Addresses)
  @JoinColumn()
  address: Addresses;

  @OneToMany(() => Schedules, (schedules) => schedules.doctor)
  schedules: Schedules[];
}

export default Doctors;
