//cada modulo tendrá un dto para validar la información

import { IsOptional, IsUUID, IsDate } from 'class-validator';

export class BaseDTO {

    @IsUUID()
    @IsOptional()
    id!: string;

    @IsDate()
    @IsOptional()
    createAt!: Date;

    @IsDate()
    @IsOptional()
    updateAt!: Date;
}