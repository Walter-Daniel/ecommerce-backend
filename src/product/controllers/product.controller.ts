import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { HttpResponse } from '../../shared/response/htttp.response';


export class ProductController {

    constructor(private readonly userService: ProductService = new ProductService(), private readonly httpResponse: HttpResponse = new HttpResponse()){};

    async getProducts(req: Request, res: Response){
       try {
        const data = await this.userService.findProducts();
        if (data.length === 0) {
            return this.httpResponse.NotFound(res, 'No existe ningún usuario registrado')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async getProductById(req: Request, res: Response){
        const {id} = req.params;
       try {
        const data = await this.userService.findProductById(id);
        if(!data) {
            return this.httpResponse.NotFound(res, 'No se encontró ningún producto con ese id')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async createProduct(req: Request, res: Response){
       try {
        const data = await this.userService.createProduct(req.body);
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async updateProduct(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.updateProduct(id, req.body);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al actualizar');
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async deleteProduct(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.deleteProduct(id);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al eliminar el producto');
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

}