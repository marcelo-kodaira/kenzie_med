import { Exclude } from "class-transformer"
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import Doctors from "./doctor.entity"

@Entity("specialties")
class Specialties {
  @PrimaryGeneratedColumn("increment")
  id: string

  @Column()
  name: string

  @OneToMany(() => Doctors, (doctors) => doctors.specialties)
  @Exclude()
  doctors: Doctors[]
}

export default Specialties
