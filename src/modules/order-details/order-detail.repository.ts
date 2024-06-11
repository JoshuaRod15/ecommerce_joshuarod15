/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "./order-details.entity";
import { Repository } from "typeorm";
import { Product } from "../Products/products.entity";

@Injectable()
export class OrdersDetailRespository{
    constructor(
        @InjectRepository(OrderDetail) private ordersDetailRepository: Repository<OrderDetail>,
        @InjectRepository(Product) private productRespository: Repository<Product>
    ){};

    async getOrdersDetails(){
        const ordersDetails = this.ordersDetailRepository.find({
            relations:{
                products:true
            }
        })
        return ordersDetails
    }

    async addOrderDetail(price, productsArray){
        let products=[]
        
        for (const product of productsArray) {
            const id = product.id
             products.push(await this.productRespository.findOne({where:{id}}))
        }
        products = products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imgUrl: product.imgUrl
          }))
        const newOrderDetail = {price, products}
        const createdOrderDetail: OrderDetail = await this.ordersDetailRepository.save(newOrderDetail)
        return createdOrderDetail
    }
}