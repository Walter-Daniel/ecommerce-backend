import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { UserDTO } from '../dto/user.dto';
import { HttpResponse } from '../../shared/response/htttp.response';

export class UserMiddleware {
    constructor(private readonly httpResponse : HttpResponse = new HttpResponse()){}
    userValidatior(req: Request, res:Response, next: NextFunction){
        const {name, lastname, email, password, province, city, role} = req.body;

        const validator = new UserDTO();
        validator.name = name;
        validator.lastname = lastname;
        validator.email = email;
        validator.password = password;
        validator.province = province;
        validator.city = city;
        validator.role = role;
   
        validate(validator).then((error) => {
            if(error.length > 0) {
                return this.httpResponse.Error(res, error);
            }else {
                next();
            }
        });
    }
}