import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('specialties')
class Specialties{

    @PrimaryGeneratedColumn('increment')
    id: string

    @Column()
    name: string

}

export default Specialties