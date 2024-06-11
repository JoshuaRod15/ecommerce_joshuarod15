/* eslint-disable prettier/prettier */
import{ v4 as uuid} from 'uuid'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from '../orders/orders.entity';

@Entity({
    name: 'users'
})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({type:'varchar', length:50, nullable:false})
    name: string;

    @Column({type:'varchar', length:50, nullable:false, unique:true})
    email: string;

    @Column({type:'varchar', length:100, nullable:false, select:false})
    password: string;

    @Column({default:false})
    isadmin: boolean

    @Column('int')
    phone: number;

    @Column({type:'varchar', length:50})
    country: string;

    @Column('text')
    address: string;

    @Column({type:'varchar', length:50})
    city: string;

    @OneToMany(()=> Order, (Order)=>Order.user)
    orders:Order[]
}