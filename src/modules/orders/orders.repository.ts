/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRespository{
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>){};

    async getOrders(){
        const orders = this.orderRepository.find({
            relations:{
                user:true,
                order_detail:true,
            }
        })
        return orders
    }

    async getOrderById(id:string){
        const orderById = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.order_detail', 'order_detail')
            .leftJoinAndSelect('order_detail.products', 'product')
            .select([
                'order.id', 'order.date', 'order.user',
                'order_detail.id', 'order_detail.price',
                'product.id', 'product.name', 'product.price', 'product.description', 'product.imgUrl'
            ])
            .where('order.id = :id', { id })
            .getOne();
        
        return orderById;
        
    }

    async addOrder(order){
            const createdOrder = await this.orderRepository.save(order)
            return createdOrder 
    }
}