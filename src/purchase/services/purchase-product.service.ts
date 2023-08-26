import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseServise } from '../../config/base.service';
import { PurchaseProductEntity } from '../entities/purchase-products.entity';
import { PurchaseProductDTO } from '../dto/purchase-product.dto';
import { ProductService } from '../../product/services/product.service';

//CREAR RELACION PRECIO CANTIDAD DE PRODUCTO

export class PurchaseProductService extends BaseServise<PurchaseProductEntity> {

    constructor(
        private readonly productService: ProductService = new ProductService()
        ) { super(PurchaseProductEntity); }

    async findPurchaseProducts(): Promise<PurchaseProductEntity[]>{
        return ( await this.execRepository ).find();
    }
    async findPurchaseProductById(id:string): Promise<PurchaseProductEntity | null>{
        return (await this.execRepository).findOneBy({ id });
    }
    async findPurchaseProducRelationstById(id:string): Promise<PurchaseProductEntity | null>{
        return (await this.execRepository)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.purchase','purchase')
        .where({id})
        .getOne()
    }
    async createPurchaseProduct(body: PurchaseProductDTO): Promise<PurchaseProductEntity>{
        //Se guarda en memoria la creación base, que puedo luego mutarla en el mismo servicio.
        const newPP = (await this.execRepository).create(body);
        const product = await this.productService.findProductById(newPP.product.id);
        //la cantidad viene por el body y el precio viene de la entidad que lo tiene previamente guardado.
        newPP.totalPrice = product!.price * newPP.quantityProducts
        return (await this.execRepository).save(newPP)
    }
    async deletePurchaseProduct(id:string): Promise<DeleteResult>{
        return (await this.execRepository).delete({id})
    }
    async updatePurchaseProduct(id: string, infoUpdate: PurchaseProductDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate)
    }

}