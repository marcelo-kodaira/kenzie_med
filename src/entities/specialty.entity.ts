import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import Doctors from "./doctor.entity";

@Entity("specialties")
class Specialties {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Doctors, (doctors) => doctors.specialties, { eager: true })
  doctors: Doctors[];
}

export default Specialties;