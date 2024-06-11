/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import{ v4 as uuid} from 'uuid'
import { Category } from "../categories/categories.entity";

@Entity({
    name:'products'
})
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({type:'varchar', length:50, nullable:false})
    name: string

    @Column({type:'text', nullable:false})
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number; 

    @Column('int', {nullable:false})
    stock: number;

    
    @ManyToMany(() => Category)
    @JoinTable({
        name: 'products_categories'
    })
    category: Category[]
    
    @Column('text',{default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq6Sc43S1-ZMe4-IFR2DK07vNmh0YIWmMorQ&s'})
    imgUrl: string;
}