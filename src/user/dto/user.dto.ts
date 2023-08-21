import { BaseDTO } from "../../config/base.dto";
import { IsNotEmpty } from 'class-validator'

export class UserDTO extends BaseDTO {

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastname!: string;

    @IsNotEmpty()
    rol!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    password!: string

    @IsNotEmpty()
    province!: string;

    @IsNotEmpty()
    city!: string;
}