/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Category } from '../categories/categories.entity';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesRepository } from '../categories/categories.repository';


@Module({
    imports:[
        TypeOrmModule.forFeature([Product, Category])
    ],
    controllers:[ProductsController],
    providers:[ProductsService, ProductsRepository, CategoriesService, CategoriesRepository]
})
export class ProductsModule{}
    