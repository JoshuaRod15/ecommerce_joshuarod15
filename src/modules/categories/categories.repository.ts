/* eslint-disable prettier/prettier */
import {  Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { Repository } from "typeorm";


@Injectable()
export class CategoriesRepository{
    constructor(@InjectRepository(Category) private categoriesRespository: Repository<Category>){}

    async getCategories(){
        const allCategories = await this.categoriesRespository.find()
        return allCategories
    }

    async addCategories(categories: Category[]){
        const createdCategories = await this.getCategories()

        createdCategories.length>0 && (()=>{
            console.log('Categories have already preloaded');
            return 'Categories have already been preloaded'
        })();

        if (createdCategories.length === 0) {
            for (const category of categories) {
                   const createdCategory = await this.categoriesRespository.save(category)
                createdCategories.push(createdCategory); 
            }
            return createdCategories 
        }  
    }
}