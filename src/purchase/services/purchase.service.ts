import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseServise } from '../../config/base.service';
import { PurchaseEntity } from '../entities/purchase.entity';
import { PurchaseDTO } from '../dto/purchase.dto';


export class PurchaseService extends BaseServise<PurchaseEntity> {

    constructor() {
        super(PurchaseEntity);
    }

    async findPurchases(): Promise<PurchaseEntity[]>{
        return ( await this.execRepository ).find();
    }
    async findPurchaseById(id:string): Promise<PurchaseEntity | null>{
        return (await this.execRepository).findOneBy({ id });
    }
    async findPurchaseRelationsById(id:string): Promise<PurchaseEntity | null> {
        return (await this.execRepository)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.customer','customer')
        .where({id})
        .getOne()
    }
    async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity>{
        return (await this.execRepository).save(body)
    }
    async deletePurchase(id:string): Promise<DeleteResult>{
        return (await this.execRepository).delete({id})
    }
    async updatePurchase(id: string, infoUpdate: PurchaseDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate)
    }

}