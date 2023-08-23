import { Request, Response } from 'express';
import { PurchaseProductService } from '../services/purchase-product.service';


export class PurchaseProductController {

    constructor(private readonly userService: PurchaseProductService = new PurchaseProductService()){};

    async getPurchaseProducts(req: Request, res: Response){
       try {
        const data = await this.userService.findPurchaseProducts();
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async getPurchaseProductById(req: Request, res: Response){
        const {id} = req.params;
       try {
        const data = await this.userService.findPurchaseProductById(id);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async createPurchaseProduct(req: Request, res: Response){
       try {
        const data = await this.userService.createPurchaseProduct(req.body);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async updatePurchaseProduct(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.updatePurchaseProduct(id, req.body);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async deletePurchaseProduct(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.deletePurchaseProduct(id);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

}