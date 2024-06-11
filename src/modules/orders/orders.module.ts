/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRespository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrdersDetailsService } from '../order-details/order-details.service';
import { OrderDetail } from '../order-details/order-details.entity';
import { OrdersDetailRespository } from '../order-details/order-detail.repository';
import { ProductsService } from '../Products/products.service';
import { ProductsRepository } from '../Products/products.repository';
import { CategoriesService } from '../categories/categories.service';
import { Product } from '../Products/products.entity';
import { CategoriesRepository } from '../categories/categories.repository';
import { Category } from '../categories/categories.entity';
import { User } from '../Users/users.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([Order, OrderDetail, Product, Category, User])
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRespository, OrdersDetailsService, OrdersDetailRespository , ProductsService, ProductsRepository, CategoriesService, CategoriesRepository]
})
export class OrdersModule {}
