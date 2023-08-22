import { Request, Response } from 'express';
import { PurchaseService } from '../services/purchase.service';

export class PurchaseController {

    constructor(private readonly userService: PurchaseService = new PurchaseService()){};

    async getPurchase(req: Request, res: Response){
       try {
        const data = await this.userService.findPurchases();
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async getPurchaseById(req: Request, res: Response){
        const {id} = req.params;
       try {
        const data = await this.userService.findPurchaseById(id);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async createPurchase(req: Request, res: Response){
       try {
        const data = await this.userService.createPurchase(req.body);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async updatePurchase(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.updatePurchase(id, req.body);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async deletePurchase(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.deletePurchase(id);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

}