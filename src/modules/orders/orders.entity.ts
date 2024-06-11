/* eslint-disable prettier/prettier */
import{ v4 as uuid} from 'uuid'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../Users/users.entity';
import { OrderDetail } from '../order-details/order-details.entity';

@Entity({
    name: 'orders'
})
export class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('date',{default: new Date()})
    date: Date
    
    @ManyToOne(()=> User, (user) => user.orders)
    user: User

    @OneToOne(() => OrderDetail)
    @JoinColumn()
    order_detail: OrderDetail
}