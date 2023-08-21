import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { PurchaseProductEntity } from '../../purchase/entities/purchase-products.entity';

@Entity({name:'product'})
export class ProductEntity extends BaseEntity {

    @Column()
    productName!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @Column({ default: true })
    stock!:boolean

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name:'category_id' })
    category!: CategoryEntity;

    @OneToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.product)
    purchaseProduct!: PurchaseProductEntity[]
}