import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from '../../customer/entities/customer.entity';

@Entity({name:"user"})
export class UserEntity extends BaseEntity {

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    email!: string;

    @Column({ select:false })
    password!: string;

    @Column()
    province!: string;

    @Column()
    city!: string;

    @OneToOne(() =>  CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
}