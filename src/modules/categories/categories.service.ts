/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CategoriesService {
    constructor(private  readonly categoriesRepository: CategoriesRepository){}

    async getCategories(){
        const categories = await this.categoriesRepository.getCategories()
        return categories
    }

    async addCategories(){
        const filePath = path.join(__dirname, '../../../src/utils/data.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileData);
        const categoriesSet = new Set();
        const categories = []
        for (const product of data) {
            if (!categoriesSet.has(product.category)) {
                categoriesSet.add(product.category)
                categories.push({"name":product.category})
                
            }
        }
        const addedCategories = await this.categoriesRepository.addCategories(categories)
        return addedCategories 
    }
}
