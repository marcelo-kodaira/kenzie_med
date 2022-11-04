import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import Doctors from "./doctor.entity";


@Entity('specialties')
class Specialties{

@PrimaryGeneratedColumn('increment')
id: string

@Column()
name: string

@OneToMany(()=> Doctors, doctors=> doctors.specialties )
specialies: Specialties[]


}

export default Specialties