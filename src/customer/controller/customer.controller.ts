import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';
import { HttpResponse } from '../../shared/response/htttp.response';


export class CustomerController {

    constructor(private readonly userService: CustomerService = new CustomerService(), private readonly httpResponse: HttpResponse = new HttpResponse()){};

    async getCustomers(req: Request, res: Response){
       try {
        const data = await this.userService.findCustomers();
        res.status(200).json({
            data
        })
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async getCustomerById(req: Request, res: Response){
        const {id} = req.params;
        try {
        const data = await this.userService.findCustomerById(id);
        if(!data) {
            return this.httpResponse.NotFound(res, 'No se encontró ningún cliente con ese id')
        }
        return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createCustomer(req: Request, res: Response){
       try {
        const data = await this.userService.createCustomer(req.body);
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async updateCustomer(req: Request, res: Response){
        const {id} = req.params
        try {
        const data = await this.userService.updateCustomer(id, req.body);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al actualizar el cliente');
        }
        return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async deleteCustomer(req: Request, res: Response){
        const {id} = req.params
        try {
        const data = await this.userService.deleteCustomer(id);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al eliminar el cliente');
        }
        return this.httpResponse.Ok(res, data);
        } catch (error) {
        return this.httpResponse.Error(res, error);
        }
    }
}