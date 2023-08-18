//id
//update_ad
//create_ad
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {

    @PrimaryGeneratedColumn('uuid') //combinacion alfanumérica, identificador único
    id!: string;

    @CreateDateColumn({
        name: 'created_ad',
        type: 'timestamp' //trae año, día, mes y hora
    })
    createAd!: Date;

    @UpdateDateColumn({
        name: 'update_ad',
        type: 'timestamp'
    })
    updateAt!: Date;
}