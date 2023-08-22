import { BaseDTO } from "../../config/base.dto";
import { IsNotEmpty } from 'class-validator'

export class CategoryDTO extends BaseDTO {

    @IsNotEmpty()
    categoryName!: string;

}