
import { BaseRouter } from '../../shared/router/router';
import { PurchaseProductController } from '../controller/purchase-products.controller';


export class PurchaseProductRouter extends BaseRouter<PurchaseProductController>{
    constructor() {
        super(PurchaseProductController)
    }

    routes(): void {
        this.router.get('/purchases', (req, res) => this.controller.getPurchaseProducts(req, res));
        this.router.get('/purchase/:id', (req, res) => this.controller.getPurchaseProductById(req, res));
        this.router.post('/createPurchase', (req, res) => this.controller.createPurchaseProduct(req, res));
        this.router.put('/updatePurchase/:id', (req, res) => this.controller.updatePurchaseProduct(req, res));
        this.router.delete('/daletePurchase/:id', (req, res) => this.controller.deletePurchaseProduct(req, res));
    }
}