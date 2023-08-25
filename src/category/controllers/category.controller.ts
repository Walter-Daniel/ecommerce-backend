import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { HttpResponse } from '../../shared/response/htttp.response';

export class CategoryController {

    constructor(private readonly userService: CategoryService = new CategoryService(), private readonly httpResponse: HttpResponse = new HttpResponse()){};

    async getCategories(req: Request, res: Response){
       try {
        const data = await this.userService.findAllCategories();
        if (data.length === 0) {
            return this.httpResponse.NotFound(res, 'No existe ningún usuario registrado')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async getCategoryById(req: Request, res: Response){
       const {id} = req.params;
       try {
        const data = await this.userService.findCategoryById(id);
        if(!data) {
            return this.httpResponse.NotFound(res, 'No se encontró ninguna categoría con ese id')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
            return this.httpResponse.Error(res, error);
       }
    }

    async createCategory(req: Request, res: Response){
       try {
        const data = await this.userService.createCategory(req.body);
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async updateCatgory(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.updateCategory(id, req.body);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al actualizar la categoría');
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async deleteCategory(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.deleteCategory(id);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al eliminar la categoría');
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }
}