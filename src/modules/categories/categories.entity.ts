/* eslint-disable prettier/prettier */
import{ v4 as uuid} from 'uuid'
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name:'categories'
})
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({type:'varchar',length:50, nullable: false, unique:true})
    name: string

}