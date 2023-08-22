import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';


export class CustomerController {

    constructor(private readonly userService: CustomerService = new CustomerService()){};

    async getCustomer(req: Request, res: Response){
       try {
        const data = await this.userService.findCustomers();
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async getCustomerById(req: Request, res: Response){
        const {id} = req.params;
       try {
        const data = await this.userService.findCustomerById(id);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async createCustomer(req: Request, res: Response){
       try {
        const data = await this.userService.createCustomer(req.body);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async updateCustomer(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.updateCustomer(id, req.body);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async deleteCustomer(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.deleteCustomer(id);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

}