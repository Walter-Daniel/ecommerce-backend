import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';


export class ProductController {

    constructor(private readonly userService: ProductService = new ProductService()){};

    async getProducts(req: Request, res: Response){
       try {
        const data = await this.userService.findProducts();
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async getProductById(req: Request, res: Response){
        const {id} = req.params;
       try {
        const data = await this.userService.findProductById(id);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async createProduct(req: Request, res: Response){
       try {
        const data = await this.userService.createProduct(req.body);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async updateProduct(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.updateProduct(id, req.body);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async deleteProduct(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.deleteProduct(id);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

}