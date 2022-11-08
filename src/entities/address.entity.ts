import { Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Users from "./user.entity";

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

    // @OneToOne(() => Users, (user) => user.address, {onDelete: "CASCADE"})
    // user: Users

}

export default Addresses