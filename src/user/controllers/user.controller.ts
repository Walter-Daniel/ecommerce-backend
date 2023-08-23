import { Request, Response } from 'express';
import { UserService } from '../services/user.services';
import { HttpResponse } from '../../shared/response/htttp.response';
import { DeleteResult, UpdateResult } from 'typeorm';

export class UserController {

    constructor(private readonly userService: UserService = new UserService(), 
                private readonly httpResponse: HttpResponse = new HttpResponse()){};

    async getUsers(req: Request, res: Response){
       try {
        const data = await this.userService.findAllUser();
        if (data.length === 0) {
            return this.httpResponse.NotFound(res, 'No existe dato')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);  
       }
    }

    async getUserById(req: Request, res: Response){
       const {id} = req.params;
       try {
        const data = await this.userService.findUserById(id);
        if(!data) {
            return this.httpResponse.NotFound(res, 'No existe el dato solicitado')
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async createUser(req: Request, res: Response){
       try {
        const data = await this.userService.createUser(req.body);
        return this.httpResponse.Ok(res, data);

       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async updateUser(req: Request, res: Response){
       const {id} = req.params
       try {
        const data: UpdateResult = await this.userService.updateUser(id, req.body);
        //evita ingresar un id erroneo, id inexistente.
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al actualizar');
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

    async deleteUser(req: Request, res: Response){
       const {id} = req.params
       try {
        const data: DeleteResult = await this.userService.deleteUser(id);
        if(!data.affected) {
            return this.httpResponse.NotFound(res, 'Error al actualizar');
        }
        return this.httpResponse.Ok(res, data);
       } catch (error) {
        return this.httpResponse.Error(res, error);
       }
    }

}