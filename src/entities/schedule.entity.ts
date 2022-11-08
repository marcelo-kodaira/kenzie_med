import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Doctors from "./doctor.entity";
import Users from "./user.entity";

@Entity('schedules')
class Schedules{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({type: 'date'})
    date: string

    @Column({type: 'time'})
    hour: string

    @Column()
    type: string

    @Column()
    description: string

    @Column({default: true})
    isAvailable: boolean

    @ManyToOne(()=> Users, {eager: true, nullable: true})
    user?: Users

    @ManyToOne(()=> Doctors, {eager: true , nullable: true})
    doctor?: Doctors

}

export default Schedules