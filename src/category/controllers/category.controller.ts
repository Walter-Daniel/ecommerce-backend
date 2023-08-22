import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {

    constructor(private readonly userService: CategoryService = new CategoryService()){};

    async getCategories(req: Request, res: Response){
       try {
        const data = await this.userService.findAllCategories();
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async getCategoryById(req: Request, res: Response){
        const {id} = req.params;
       try {
        const data = await this.userService.findCategoryById(id);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async createCategory(req: Request, res: Response){
       try {
        const data = await this.userService.createCategory(req.body);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async updateCatgory(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.updateCategory(id, req.body);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

    async deleteCategory(req: Request, res: Response){
        const {id} = req.params
       try {
        const data = await this.userService.deleteCategory(id);
        res.status(200).json({
            data
        })
       } catch (error) {
        console.log(error);
       }
    }

}