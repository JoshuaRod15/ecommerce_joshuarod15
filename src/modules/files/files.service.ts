/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../Products/products.entity';
import { Repository } from 'typeorm';


@Injectable()
export class FilesService {
    constructor(
        private readonly filesRepository: FilesRepository,
        @InjectRepository(Product) private productsRepository: Repository<Product>
    ){};

    async uploadProductImage(id, file){
        const product = this.productsRepository.findOne({
            where: ({id:id})
        })
        if(!product)throw new NotFoundException('Product not found')
        const uploadedImage = await this.filesRepository.uploadImage(file)
        console.log(uploadedImage.url);
        await this.productsRepository.update({id:id}, {imgUrl:uploadedImage.secure_url})
        const updatedProduct = await this.productsRepository.findOne({
            where:({id:id}),
            relations:{
                category:true
            }
        })
        return updatedProduct
    }

}
