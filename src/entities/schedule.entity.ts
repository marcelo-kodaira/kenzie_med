import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Doctors from "./doctor.entity";
import Users from "./user,entity";

@Entity('schedules')
class Schedules{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 200})
    status: string

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

    @ManyToOne(()=> Users)
    user: Users

    @ManyToOne(()=> Doctors)
    doctor: Doctors

}

export default Schedules