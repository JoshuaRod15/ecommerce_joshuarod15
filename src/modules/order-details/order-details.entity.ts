/* eslint-disable prettier/prettier */
import{ v4 as uuid} from 'uuid'
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '../Products/products.entity';

@Entity({
    name: 'orders_details'
})
export class OrderDetail{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @ManyToMany(() => Product)
    @JoinTable({
        name:'orderdetail_products'
    })
    products: Product[]
}