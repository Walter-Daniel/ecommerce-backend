import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

import { HttpResponse } from '../../shared/response/htttp.response';
import { CategoryDTO } from '../dto/category.dto';

export class CategoryMiddleware {
    constructor(private readonly httpResponse : HttpResponse = new HttpResponse()){}
    userValidatior(req: Request, res:Response, next: NextFunction){
        const {categoryName} = req.body;

        const validator = new CategoryDTO();
        validator.categoryName = categoryName;
   
        validate(validator).then((error) => {
            if(error.length > 0) {
                return this.httpResponse.Error(res, error);
            }else {
                next();
            }
        });
    }
}