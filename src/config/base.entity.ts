//id
//update_ad
//create_ad
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {

    @PrimaryGeneratedColumn('uuid') //combinacion alfanumérica, identificador único
    id!: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp' //trae año, día, mes y hora
    })
    createAt!: Date;

    @UpdateDateColumn({
        name: 'update_at',
        type: 'timestamp'
    })
    updateAt!: Date;
}