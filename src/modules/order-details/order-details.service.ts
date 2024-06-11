/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrdersDetailRespository } from './order-detail.repository';
import { ProductsService } from '../Products/products.service';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../Products/products.entity';
import { OrderDetail } from './order-details.entity';


@Injectable()
export class OrdersDetailsService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private readonly ordersDetailRepository: OrdersDetailRespository,
        private readonly productsService: ProductsService,
        private dataSource: DataSource,
    ){};

    async getOrders(){
        const orders = this.ordersDetailRepository.getOrdersDetails()
        return orders
    }

    async addOrderDetail(idsProducts, queryRunner: QueryRunner){
        const products = [];
        let price = 0;
        try {
            for (const idProduct of idsProducts) {
                const product = await queryRunner.manager.findOne(Product, {where: { id: idProduct.id }})
                if (!product || product.stock <= 0) {
                    throw new HttpException(`One or more of the listed products are not available at the moment`, HttpStatus.BAD_REQUEST);
                }
                const productPrice = Number(product.price);
                price += productPrice;
                await queryRunner.manager.update(Product, {id:product.id}, {stock:(product.stock-1)})
                products.push({ id: product.id});
            }
                const createdOrderDetail = await queryRunner.manager.save(OrderDetail, {price, products})
                return createdOrderDetail;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

        }
    }

