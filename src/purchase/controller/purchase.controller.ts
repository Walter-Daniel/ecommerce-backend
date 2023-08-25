import { Request, Response } from 'express';
import { PurchaseService } from '../services/purchase.service';
import { HttpResponse } from '../../shared/response/htttp.response';

export class PurchaseController {

    constructor(private readonly userService: PurchaseService = new PurchaseService(), private readonly httpResponse: HttpResponse = new HttpResponse()){};

    async getPurchases(req: Request, res: Response){
       try {
        const data = await this.userService.findPurchases();
        if (data.length === 0) {
            return this.httpResponse.NotFound(res, 'No se encontraron compras')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async getPurchaseById(req: Request, res: Response){
        const {id} = req.params;
       try {
        const data = await this.userService.findPurchaseById(id);
        if(!data) {
            return this.httpResponse.NotFound(res, 'No se encontró ninguna compra con ese id')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async createPurchase(req: Request, res: Response){
       try {
        const data = await this.userService.createPurchase(req.body);
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async updatePurchase(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.updatePurchase(id, req.body);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al actualizar la compra');
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async deletePurchase(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.deletePurchase(id);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al eliminar la compra');
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

}