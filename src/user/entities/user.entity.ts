import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { RoleType } from '../dto/user.dto';

@Entity({name:"user"})
export class UserEntity extends BaseEntity {

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ select:false })
    password!: string;

    @Column()
    province!: string;

    @Column()
    city!: string;

    @Column({type:'enum', enum: RoleType, nullable: false})
    rol!: RoleType;

    @OneToOne(() =>  CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
}