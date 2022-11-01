import { Column, CreateDateColumn, Entity, JoinColumn,    OneToMany,    OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Addresses from "./address.entity";
import Schedules from "./schedule.entity";
import Specialities from "./speciality.entity";

@Entity('doctors')
class Doctors{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 200})
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({length: 11})
    CRM: string

    @Column()
    sex: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    @Column({default: true})
    isActive: boolean

    @OneToOne(()=> Specialities)
    @JoinColumn()
    specialities: Specialities

    @OneToOne(()=> Addresses)
    @JoinColumn()
    address: Addresses

    @OneToMany(()=> Schedules, (schedules) => schedules.doctor)
    schedules: Schedules[]

}

export default Doctors