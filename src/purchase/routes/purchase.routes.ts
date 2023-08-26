
import { BaseRouter } from '../../shared/router/router';
import { PurchaseController } from '../controller/purchase.controller';
import { PurchaseMiddleware } from '../middleware/purchase.middleware';

export class PurchaseRouter extends BaseRouter<PurchaseController, PurchaseMiddleware>{
    constructor() {
        super(PurchaseController, PurchaseMiddleware)
    }

    routes(): void {
        this.router.get('/purchases', (req, res) => this.controller.getPurchases(req, res));
        this.router.get('/purchase/:id', (req, res) => this.controller.getPurchaseById(req, res));
        this.router.get('/purchaseRelation/:id', (req, res) => this.controller.getPurchaseWithRelationById(req, res));
        this.router.post('/createPurchase',
                        (req, res, next) => [this.middleware.PurchaseValidatior(req, res, next)], 
                        (req, res) => this.controller.createPurchase(req, res));
        this.router.put('/updatePurchase/:id', (req, res) => this.controller.updatePurchase(req, res));
        this.router.delete('/daletePurchase/:id', (req, res) => this.controller.deletePurchase(req, res));
    }
}