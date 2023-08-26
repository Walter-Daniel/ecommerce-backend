import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { HttpResponse } from '../../shared/response/htttp.response';
import { CustomerDTO } from '../dto/customer.dto';


export class CustomerMiddleware {
    constructor(private readonly httpResponse : HttpResponse = new HttpResponse()){}
    customerValidatior(req: Request, res:Response, next: NextFunction){
        const {adress, dni, user} = req.body;

        const validator = new CustomerDTO();
        validator.adress = adress;
        validator.dni = dni;
        validator.user = user;
   
        validate(validator).then((error) => {
            if(error.length > 0) {
                return this.httpResponse.Error(res, error);
            }else {
                next();
            }
        });
    }
}