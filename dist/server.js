"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const category_routes_1 = require("./category/routes/category.routes");
const customer_routes_1 = require("./customer/routes/customer.routes");
const product_routes_1 = require("./product/routes/product.routes");
const purchase_routes_1 = require("./purchase/routes/purchase.routes");
const purchase_product_routes_1 = require("./purchase/routes/purchase-product.routes");
const user_routes_1 = require("./user/routes/user.routes");
class Server extends config_1.ConfigServer {
    constructor() {
        super();
        this.app = (0, express_1.default)();
        this.port = this.getNumberEnv('PORT') || 8000;
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.dbConnect();
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use('/api', this.routers());
        this.listen();
    }
    routers() {
        return [
            new category_routes_1.CategoryRouter().router,
            new customer_routes_1.CustomerRouter().router,
            new product_routes_1.ProductRouter().router,
            new purchase_routes_1.PurchaseRouter().router,
            new purchase_product_routes_1.PurchaseProductRouter().router,
            new user_routes_1.UserRouter().router
        ];
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.initConnect.then(() => {
                console.log('\x1b[36m%s\x1b[0m', 'Database Connected');
            }).catch((error) => { console.log('\x1b[31m%s\x1b[0m', 'Error', error); });
        });
    }
    listen() {
        this.app.listen(this.port, () => { console.log('\x1b[35m%s\x1b[0m', `Server listening on port ${this.port}`); });
    }
}
new Server();
