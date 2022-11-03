import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('addresses')
class Addresses{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    district: string

    @Column()
    zipCode: string

    @Column()
    number: string

    @Column()
    state: string

    @Column()
    city: string

}

export default Addresses