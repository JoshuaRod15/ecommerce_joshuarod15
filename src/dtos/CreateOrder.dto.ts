/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID} from "class-validator";



export class CreateOrderDto{
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    user_id:string

    @IsArray()
    @IsNotEmpty()
    @ArrayMinSize(1)
    products:[]
}