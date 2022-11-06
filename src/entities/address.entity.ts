import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('addresses')
class Addresses{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    district: string

    @Column({length:8})
    zipCode: string

    @Column({type: "integer"})
    number: number

    @Column({length: 2})
    state: string

    @Column()
    city: string

}

export default Addresses