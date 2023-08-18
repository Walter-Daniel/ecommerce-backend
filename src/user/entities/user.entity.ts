import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from '../../customer/entities/customer.entity';

@Entity({name:"user"})
export class UserEntity extends BaseEntity {

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column({ default: 'user' })
    rol!: string;

    @Column()
    email!: string;

    @Column()
    province!: string;

    @Column()
    city!: string;

    @OneToOne(() =>  CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
}