import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { HttpResponse } from '../../shared/response/htttp.response';
import { PurchaseProductDTO } from '../dto/purchase-product.dto';



export class PurchaseProductMiddleware {
    constructor(private readonly httpResponse : HttpResponse = new HttpResponse()){}
    PurchaseProductValidatior(req: Request, res:Response, next: NextFunction){
        const {quantityProduct, totalprice, purchase, product} = req.body;

        const validator = new PurchaseProductDTO();
        validator.quantityProduct = quantityProduct;
        validator.totalPrice = totalprice;
        validator.purchase = purchase;
        validator.product = product;
       
   
        validate(validator).then((error) => {
            if(error.length > 0) {
                return this.httpResponse.Error(res, error);
            }else {
                next();
            }
        });
    }
}