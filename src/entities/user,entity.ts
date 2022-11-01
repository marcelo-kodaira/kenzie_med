import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Addresses from "./address.entity";
import Schedules from "./schedule.entity";

@Entity('users')
class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 200})
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({length: 11, unique: true})
    CPF: string

    @Column({type: "integer"})
    age: number

    @Column()
    sex: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({default: false})
    isAdmin: boolean

    @Column({default: true})
    isActive: boolean

    @OneToOne(()=> Addresses)
    @JoinColumn()
    address: Addresses

    @OneToMany(()=> Schedules, schedules => schedules.user)
    schedules: Schedules[]

}

export default Users