/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrdersDetailsController } from './order-details.controller';
import { OrdersDetailsService } from './order-details.service';
import { OrdersDetailRespository } from './order-detail.repository';
import { ProductsService } from '../Products/products.service';
import { ProductsRepository } from '../Products/products.repository';

@Module({
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService, OrdersDetailRespository, ProductsService, ProductsRepository]
})
export class OrderDetailsModule {}
