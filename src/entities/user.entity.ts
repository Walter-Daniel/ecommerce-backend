import { Entity, Column } from 'typeorm';
import { BaseEntity } from "../config/base.entity";

@Entity({name:"user"})
export class UserEntity extends BaseEntity {

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    rol!: string;

    @Column()
    email!: string;
}