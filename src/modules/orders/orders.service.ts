/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrdersRespository } from './orders.repository';
import OrderDto from './OrdersDto';
import { OrdersDetailsService } from '../order-details/order-details.service';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Users/users.entity';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly ordersRespository: OrdersRespository,
        private readonly ordersDetailService: OrdersDetailsService,
        private dataSource: DataSource,
    ){};


    async getOrders(){
        const orders = await this.ordersRespository.getOrders()
        return orders
    }
   async addOrder(order: OrderDto){

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await queryRunner.manager.findOne(User, { where: { id: order.user_id } });
            if(!user)throw new BadRequestException('Users does not exist');

            const orderDetail = await this.ordersDetailService.addOrderDetail(order.products, queryRunner);
            console.log(orderDetail);
            const newOrder = {
                date: new Date(),
                user: user,
                order_detail: orderDetail 
            }
            if(!newOrder){
                throw new HttpException('Error while creating the order', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const createdOrder =  await queryRunner.manager.save(Order, newOrder);
            await queryRunner.commitTransaction();
            return createdOrder
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } finally{
            await queryRunner.release();
        }
    }

    async getOrderById(id:string){
        const orderById = await this.ordersRespository.getOrderById(id);
        return orderById
    }
}

