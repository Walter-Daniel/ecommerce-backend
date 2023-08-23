import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { UserRouter } from './user/routes/user.routes';
import { ConfigServer } from './config/config';
import { ProductRouter } from './product/routes/product.routes';
import { CategoryRouter } from './category/routes/category.routes';
import { CustomerRouter } from './customer/routes/customer.routes';
import { PurchaseRouter } from './purchase/routes/purchase.routes';
import { PurchaseProductRouter } from './purchase/routes/purchase-product.routes';

class Server extends ConfigServer {
    public app: express.Application = express();
    private port : number = this.getNumberEnv('PORT') || 8000;

    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.dbConnect();

        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', this.routers())
        this.listen()
    }

    routers(): Array<express.Router>{
        return [
            new UserRouter().router,
            new ProductRouter().router,
            new CategoryRouter().router,
            new CustomerRouter().router,
            new PurchaseRouter().router,
            new PurchaseProductRouter().router
        ]
    }

    async dbConnect() : Promise<DataSource | void>{
        return this.initConnect.then(() => {console.log('\x1b[36m%s\x1b[0m', 'Database Connected')
                             }).catch((error) => {console.log('\x1b[31m%s\x1b[0m','Error', error)})

    }


    public listen() {
        this.app.listen( this.port, () => {console.log('\x1b[35m%s\x1b[0m',`Server listening on port ${this.port}`)});
    }
}

new Server();