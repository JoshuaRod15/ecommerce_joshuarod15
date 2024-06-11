/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import * as path from "path";
import * as fs from 'fs'
import { CategoriesService } from "../categories/categories.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../categories/categories.entity";
import { Repository } from "typeorm";


@Injectable()
export class ProductsService implements OnModuleInit{
    private readonly logger = new Logger(ProductsService.name)
    constructor (
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        private readonly categorySeervice: CategoriesService,
        private readonly productsRespoitory : ProductsRepository,){};

    async onModuleInit() {
        await this.categorySeervice.addCategories()
        await this.addSeederProduct()
    }
        
    async getProducts(page, limit){
        return await this.productsRespoitory.getProducts(page, limit);
    }

    async getProductById(id: string){
        return await this.productsRespoitory.getProductById(id)
    }

    async createProduct(product){
        const newProduct = product
        const category = await this.categoryRepository.findBy({
            name: product.category
        })
        if (!category) throw new BadRequestException("Category does not exist")
        newProduct.category = category
        const productCreated = await this.productsRespoitory.createProduct(newProduct);
        return productCreated
    }

    async deleteProduct(id: number){
        const deletedProduct = this.productsRespoitory.deleteProduct(id)
        return deletedProduct
    }

    async addSeederProduct(){
        const filePath = path.join(__dirname, '../../../src/utils/data.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileData);
        const productsSet = new Set();
        const products = []
        for (const product of data) {
            if (!productsSet.has(product.name)) {
                productsSet.add(product.name)
                products.push({
                    "name": product.name,
                    "description": product.description,
                    "price": product.price,
                    "stock": product.stock,
                    "category": product.category,
                    "imgUrl": product.imgUrl
                })
                
            }
        }

        const addedProducts = await this.productsRespoitory.addSeederProducts(products)
        return addedProducts
    }

    async getSeederProducts(){
        const products = this.productsRespoitory.getSedderProducts()
        return products
    }

    async updateProduct(id, updates){
            const updatedProduct = await this.productsRespoitory.updateProduct(id, updates)
            return updatedProduct
 
    }
}