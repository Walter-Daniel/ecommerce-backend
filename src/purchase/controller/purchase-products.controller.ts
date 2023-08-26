import { Request, Response } from 'express';
import { PurchaseProductService } from '../services/purchase-product.service';
import { HttpResponse } from '../../shared/response/htttp.response';


export class PurchaseProductController {

    constructor(private readonly userService: PurchaseProductService = new PurchaseProductService(), private readonly httpResponse: HttpResponse = new HttpResponse()){};

    async getPurchaseProducts(req: Request, res: Response){
       try {
        const data = await this.userService.findPurchaseProducts();
        if (data.length === 0) {
            return this.httpResponse.NotFound(res, 'No se encontraron compras de productos')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async getPurchaseProductById(req: Request, res: Response){
        const {id} = req.params;
       try {
        const data = await this.userService.findPurchaseProductById(id);
        if(!data) {
            return this.httpResponse.NotFound(res, 'No se encontró ninguna compra de productos con ese id')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async getPurchaseProductRelationById(req: Request, res: Response){
        const {id} = req.params;
       try {
        const data = await this.userService.findPurchaseProducRelationstById(id);
        if(!data) {
            return this.httpResponse.NotFound(res, 'No se encontró ninguna compra de productos con ese id')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async createPurchaseProduct(req: Request, res: Response){
       try {
        const data = await this.userService.createPurchaseProduct(req.body);
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async updatePurchaseProduct(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.updatePurchaseProduct(id, req.body);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al actualizar la compra de productos');
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async deletePurchaseProduct(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.deletePurchaseProduct(id);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al eliminar la compra de productos');
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

}