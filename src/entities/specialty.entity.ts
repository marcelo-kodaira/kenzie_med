import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('specialties')
class Specialties{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

}

export default Specialties