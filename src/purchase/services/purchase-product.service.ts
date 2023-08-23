import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseServise } from '../../config/base.service';
import { PurchaseProductEntity } from '../entities/purchase-products.entity';
import { PurchaseProductDTO } from '../dto/purchase-product.dto';

export class PurchaseProductService extends BaseServise<PurchaseProductEntity> {

    constructor() {
        super(PurchaseProductEntity);
    }

    async findPurchaseProducts(): Promise<PurchaseProductEntity[]>{
        return ( await this.execRepository ).find();
    }
    async findPurchaseProductById(id:string): Promise<PurchaseProductEntity | null>{
        return (await this.execRepository).findOneBy({ id });
    }
    async createPurchaseProduct(body: PurchaseProductDTO): Promise<PurchaseProductEntity>{
        return (await this.execRepository).save(body)
    }
    async deletePurchaseProduct(id:string): Promise<DeleteResult>{
        return (await this.execRepository).delete({id})
    }
    async updatePurchaseProduct(id: string, infoUpdate: PurchaseProductDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate)
    }

}