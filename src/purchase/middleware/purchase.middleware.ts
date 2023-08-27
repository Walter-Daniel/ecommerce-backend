import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { HttpResponse } from '../../shared/response/htttp.response';
import { PurchaseDTO } from '../dto/purchase.dto';


export class PurchaseMiddleware {
    constructor(private readonly httpResponse : HttpResponse = new HttpResponse()){}
    PurchaseValidatior(req: Request, res:Response, next: NextFunction){
        const {status, paymentMethod, customer} = req.body;

        const validator = new PurchaseDTO();
        validator.status = status;
        validator.paymentMethod = paymentMethod;
        validator.customer = customer;
   
        validate(validator).then((error) => {
            if(error.length > 0) {
                return this.httpResponse.Error(res, error);
            }else {
                next();
            }
        });
    }
}