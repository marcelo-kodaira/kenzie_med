import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('specialities')
class Specialities{

    @PrimaryGeneratedColumn('increment')
    id: string

    @Column()
    name: string

}

export default Specialities