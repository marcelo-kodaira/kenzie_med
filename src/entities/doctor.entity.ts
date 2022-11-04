import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn,    OneToMany,    OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Addresses from "./address.entity";
import Schedules from "./schedule.entity";
import Specialties from "./specialty.entity";

@Entity('doctors')
class Doctors{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 200})
    name: string

    @Column({type: 'integer'})
    age: number

    @Column()
    email: string

    @Column()
    @Exclude()
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

    @OneToOne(()=> Specialties)
    @JoinColumn()
    specialties: Specialties

    @OneToOne(()=> Addresses, { eager: true })
    @JoinColumn()
    address: Addresses

    @OneToMany(()=> Schedules, (schedules) => schedules.doctor)
    schedules: Schedules[]

}

export default Doctors