/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Product } from "./products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../categories/categories.entity";

@Injectable()
export class ProductsRepository{
    constructor(

        @InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ){}
    private products = [{
        "id": 1,
        "name": "Laptop Dell XPS 13",
        "description": "Laptop ultradelgada con procesador Intel Core i7 y 16GB de RAM.",
        "price": 1500.00,
        "stock": true,
        "imgUrl": "https://example.com/images/dell_xps_13.jpg"
    },
    {
        "id": 2,
        "name": "Smartphone Samsung Galaxy S21",
        "description": "Smartphone con pantalla AMOLED de 6.2 pulgadas y cámara triple.",
        "price": 800.00,
        "stock": true,
        "imgUrl": "https://example.com/images/galaxy_s21.jpg"
    },
    {
        "id": 3,
        "name": "Auriculares Bose QuietComfort 35 II",
        "description": "Auriculares inalámbricos con cancelación de ruido.",
        "price": 299.99,
        "stock": false,
        "imgUrl": "https://example.com/images/bose_qc35.jpg"
    },
    {
        "id": 4,
        "name": "Monitor LG UltraWide",
        "description": "Monitor de 34 pulgadas con resolución QHD y formato ultrapanorámico.",
        "price": 600.00,
        "stock": true,
        "imgUrl": "https://example.com/images/lg_ultrawide.jpg"
    }]

    async getProducts(page, limit){
        const offset = (page-1)*limit
        return await this.productsRepository.find({
            relations:{
                category:true
            },
            skip: offset,
            take: limit
        })
    }

    async getProductById(id: string){
        const product = await this.productsRepository.findOne({
            where:({id:id}),
            relations:{
                category:true
            }
        })
        return product
    }

    async createProduct(product){
        const productCreated = this.productsRepository.save(product)
        return productCreated
    } 

    async deleteProduct(id:number){
        this.products = this.products.filter((product) => product.id !== id)
        return id
    }

    async addSeederProducts(products: Product[]){
            const createdProducts = await this.getSedderProducts();
        
            if (createdProducts.length > 0) {
                console.log('The products have already preloaded');
                return 'The products have already preloaded'
            }
        
            for (const product of products) {
                const newProduct = product 
                const catName = product.category;
                const categories = await this.categoryRepository.findBy({ name: `${catName}` });
        
                if (categories.length === 0) {
                    throw new HttpException(`There are no categories. First preload the categories`, HttpStatus.BAD_REQUEST);
                }
        
                newProduct.category = categories;
                const createdProduct = await this.productsRepository.save(newProduct);
                createdProducts.push(createdProduct);
            }
        
            return createdProducts;
        
        
        
    }

    async getSedderProducts(){
        const allProducts = await this.productsRepository.find({
            relations: {
                category:true
            }
        })
        
        !allProducts && (() => { throw new HttpException('There are not products yet', HttpStatus.BAD_REQUEST) })();
        return allProducts
    }

    async updateProduct(id, updates){
        const updatedProduct = await this.productsRepository.update({id:id}, updates)
        return updatedProduct
    }
}