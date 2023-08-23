import { CategoryController } from "../controllers/category.controller"
import { BaseRouter } from "../../shared/router/router"

export class CategoryRouter extends BaseRouter<CategoryController>{
    constructor() {
        super(CategoryController)
    }

    routes(): void {
        this.router.get('/categories', (req, res) => this.controller.getCategories(req, res));
        this.router.get('/category/:id', (req, res) => this.controller.getCategoryById(req, res));
        this.router.post('/createCategory', (req, res) => this.controller.createCategory(req, res));
        this.router.put('/updateCategory/:id', (req, res) => this.controller.updateCatgory(req, res));
        this.router.delete('/daleteCategory/:id', (req, res) => this.controller.deleteCategory(req, res));
    }
}