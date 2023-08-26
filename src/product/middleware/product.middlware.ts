import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { HttpResponse } from '../../shared/response/htttp.response';
import { ProductDTO } from '../dto/product.dto';

export class ProductMiddleware {
    constructor(private readonly httpResponse : HttpResponse = new HttpResponse()){}
    ProductValidatior(req: Request, res:Response, next: NextFunction){
        const {productName, description, price, stock, category} = req.body;

        const validator = new ProductDTO();
        validator.productName = productName;
        validator.description = description;
        validator.price = price ;
        validator.stock = stock;
        validator.category = category;
   
        validate(validator).then((error) => {
            if(error.length > 0) {
                return this.httpResponse.Error(res, error);
            }else {
                next();
            }
        });
    }
}